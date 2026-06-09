import { google } from "googleapis";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// ─── Auth tab column map ──────────────────────────────────────────────────────
// A: username
// B: passwordHash
// C: email
// D: resetToken
// E: resetTokenExpiry  (ISO timestamp)

const AUTH_RANGE_ALL = "Auth!A2:E";
const AUTH_RANGE_HEADER = "Auth!A1:E1";
const AUTH_HEADERS = ["username", "passwordHash", "email", "resetToken", "resetTokenExpiry"];

export interface AuthUser {
  username: string;
  passwordHash: string;
  email: string;
  resetToken: string;
  resetTokenExpiry: string;
}

// ─── Google auth ──────────────────────────────────────────────────────────────
function getAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentials) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON env var missing");
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheetId() {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error("GOOGLE_SHEET_ID env var missing");
  return id;
}

// ─── Row converters ───────────────────────────────────────────────────────────
function rowToUser(row: string[]): AuthUser {
  const [username, passwordHash, email, resetToken, resetTokenExpiry] = row;
  return {
    username: username ?? "",
    passwordHash: passwordHash ?? "",
    email: email ?? "",
    resetToken: resetToken ?? "",
    resetTokenExpiry: resetTokenExpiry ?? "",
  };
}

function userToRow(user: AuthUser): string[] {
  return [
    user.username,
    user.passwordHash,
    user.email,
    user.resetToken,
    user.resetTokenExpiry,
  ];
}

// ─── Ensure Auth tab + headers exist ─────────────────────────────────────────
export async function ensureAuthSheet(): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = getSheetId();

  // Get existing sheets
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existing = meta.data.sheets?.map(s => s.properties?.title) ?? [];

  // Create "Auth" tab if it doesn't exist
  if (!existing.includes("Auth")) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: "Auth" } } }],
      },
    });
  }

  // Write headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: AUTH_RANGE_HEADER,
    valueInputOption: "RAW",
    requestBody: { values: [AUTH_HEADERS] },
  });
}

// ─── Get all users ────────────────────────────────────────────────────────────
export async function getAllUsers(): Promise<AuthUser[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSheetId(),
    range: AUTH_RANGE_ALL,
  });

  return (res.data.values ?? [])
    .filter(row => row[0])
    .map(row => rowToUser(row.map(String)));
}

// ─── Find user by username ────────────────────────────────────────────────────
export async function getUserByUsername(username: string): Promise<{ user: AuthUser; rowIndex: number } | null> {
  const users = await getAllUsers();
  const idx = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
  if (idx === -1) return null;
  return { user: users[idx], rowIndex: idx + 2 }; // +1 header, +1 1-based
}

// ─── Find user by email ───────────────────────────────────────────────────────
export async function getUserByEmail(email: string): Promise<{ user: AuthUser; rowIndex: number } | null> {
  const users = await getAllUsers();
  const idx = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (idx === -1) return null;
  return { user: users[idx], rowIndex: idx + 2 };
}

// ─── Find user by reset token ─────────────────────────────────────────────────
export async function getUserByResetToken(token: string): Promise<{ user: AuthUser; rowIndex: number } | null> {
  const users = await getAllUsers();
  const idx = users.findIndex(u => u.resetToken === token);
  if (idx === -1) return null;
  return { user: users[idx], rowIndex: idx + 2 };
}

// ─── Create initial admin user ────────────────────────────────────────────────
export async function createAdminUser(
  username: string,
  password: string,
  email: string
): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const passwordHash = await bcrypt.hash(password, 12);

  const user: AuthUser = {
    username,
    passwordHash,
    email,
    resetToken: "",
    resetTokenExpiry: "",
  };

  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(),
    range: "Auth!A:E",
    valueInputOption: "RAW",
    requestBody: { values: [userToRow(user)] },
  });
}

// ─── Update a user row ────────────────────────────────────────────────────────
async function updateUserRow(rowIndex: number, user: AuthUser): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.update({
    spreadsheetId: getSheetId(),
    range: `Auth!A${rowIndex}:E${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: { values: [userToRow(user)] },
  });
}

// ─── Verify password ──────────────────────────────────────────────────────────
export async function verifyPassword(username: string, password: string): Promise<boolean> {
  const result = await getUserByUsername(username);
  if (!result) return false;
  return bcrypt.compare(password, result.user.passwordHash);
}

// ─── Generate reset token + save to sheet ────────────────────────────────────
export async function generateResetToken(email: string): Promise<string | null> {
  const result = await getUserByEmail(email);
  if (!result) return null;

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

  await updateUserRow(result.rowIndex, {
    ...result.user,
    resetToken: token,
    resetTokenExpiry: expiry,
  });

  return token;
}

// ─── Verify reset token (checks token + expiry) ───────────────────────────────
export async function verifyResetToken(token: string): Promise<{ valid: boolean; username?: string; rowIndex?: number }> {
  const result = await getUserByResetToken(token);
  if (!result) return { valid: false };

  const expiry = new Date(result.user.resetTokenExpiry);
  if (Date.now() > expiry.getTime()) {
    return { valid: false }; // expired
  }

  return { valid: true, username: result.user.username, rowIndex: result.rowIndex };
}

// ─── Reset password ───────────────────────────────────────────────────────────
export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  const { valid, rowIndex } = await verifyResetToken(token);
  if (!valid || !rowIndex) return false;

  const result = await getUserByResetToken(token);
  if (!result) return false;

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await updateUserRow(rowIndex, {
    ...result.user,
    passwordHash,
    resetToken: "",        // clear token after use
    resetTokenExpiry: "",  // clear expiry after use
  });

  return true;
}

// ─── Change password (for logged-in user) ────────────────────────────────────
export async function changePassword(
  username: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const result = await getUserByUsername(username);
  if (!result) return { success: false, error: "User not found" };

  const valid = await bcrypt.compare(currentPassword, result.user.passwordHash);
  if (!valid) return { success: false, error: "Current password is incorrect" };

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await updateUserRow(result.rowIndex, { ...result.user, passwordHash });

  return { success: true };
}