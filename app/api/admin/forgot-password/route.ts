import { NextRequest, NextResponse } from "next/server";
import { generateResetToken } from "@/lib/auth-sheets";
import { sendPasswordResetEmail } from "@/lib/email";
import { getUserByEmail } from "@/lib/auth-sheets";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Always return success even if email not found (security best practice)
    // This prevents email enumeration attacks
    const result = await getUserByEmail(email);

    if (result) {
      const token = await generateResetToken(email);

      if (token) {
        await sendPasswordResetEmail(email, result.user.username, token);
      }
    }

    // Always return the same response regardless of whether email exists
    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a reset link has been sent.",
    });
  } catch (err: any) {
    console.error("Forgot password error:", err);
    // Still return success to avoid leaking info
    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a reset link has been sent.",
    });
  }
}