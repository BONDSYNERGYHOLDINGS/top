import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken, resetPassword } from "@/lib/auth-sheets";

// GET /api/admin/reset-password?token=xxx — verify token is valid
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ valid: false, error: "Token is required" }, { status: 400 });
  }

  try {
    const result = await verifyResetToken(token);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ valid: false, error: err.message }, { status: 500 });
  }
}

// POST /api/admin/reset-password — set new password
export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  try {
    const success = await resetPassword(token, newPassword);

    if (!success) {
      return NextResponse.json(
        { error: "Invalid or expired reset token. Please request a new one." },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (err: any) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}