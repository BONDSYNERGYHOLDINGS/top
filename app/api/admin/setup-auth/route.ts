import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, verifyAdminToken } from "@/lib/auth";
import { ensureAuthSheet, createAdminUser, getAllUsers } from "@/lib/auth-sheets";

// POST /api/admin/setup-auth
// Creates the Auth sheet tab and seeds the initial admin user from env vars
export async function POST(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const session = await verifyAdminToken(token);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  try {
    // 1. Ensure the Auth tab exists with correct headers
    await ensureAuthSheet();

    // 2. Check if admin user already exists
    const users = await getAllUsers();
    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminUser || !adminPass) {
      return NextResponse.json({ error: "Admin credentials are incorrect" }, { status: 500 });
    }

    const alreadyExists = users.some(u => u.username.toLowerCase() === adminUser.toLowerCase());

    if (alreadyExists) {
      return NextResponse.json({
        success: true,
        message: "Auth sheet already set up. Admin user already exists.",
        alreadyExists: true,
      });
    }

    // 3. Create admin user with env var password (hashed) and provided email
    await createAdminUser(adminUser, adminPass, email);

    return NextResponse.json({
      success: true,
      message: `Auth sheet created. Admin user "${adminUser}" added with your current password and email "${email}".`,
      alreadyExists: false,
    });
  } catch (err: any) {
    console.error("Setup auth error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET — check if auth is set up
export async function GET(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const session = await verifyAdminToken(token);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const users = await getAllUsers();
    return NextResponse.json({ setup: users.length > 0, count: users.length });
  } catch {
    return NextResponse.json({ setup: false, count: 0 });
  }
}