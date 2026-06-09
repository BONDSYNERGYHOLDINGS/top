const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";


export async function sendPasswordResetEmail(
  toEmail: string,
  username: string,
  resetToken: string
): Promise<{ success: boolean; error?: string }> {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const resetUrl = `${SITE_URL}/admin/reset-password?token=${resetToken}`;

  try {
    const { error } = await resend.emails.send({
      from: `Site maintainer at Top Properties Nigeria`,
      to: toEmail,
      subject: "Reset Your Admin Password; Top Properties Nigeria",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#052e16,#0A4D2E);padding:32px 40px;text-align:center;">
      <div style="width:48px;height:48px;background:rgba(255,255,255,0.15);border-radius:12px;margin:0 auto 12px;display:inline-flex;align-items:center;justify-content:center;">
        <span style="font-size:24px;font-weight:700;color:white;line-height:1;">N</span>
      </div>
      <h1 style="margin:8px 0 0;color:white;font-size:20px;font-weight:700;">Naija Realty</h1>
      <p style="margin:4px 0 0;color:rgba(167,243,208,0.8);font-size:13px;">Admin Portal</p>
    </div>

    <div style="padding:40px;">
      <h2 style="margin:0 0 8px;color:#0A4D2E;font-size:22px;font-weight:700;">Reset Your Password</h2>
      <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;">
        Hi <strong style="color:#111827;">${username}</strong>, click below to reset your admin password.
      </p>

      <div style="text-align:center;margin:32px 0;">
        <a href="${resetUrl}"
          style="display:inline-block;padding:14px 32px;background:linear-gradient(to right,#0A4D2E,#16a34a);color:white;text-decoration:none;border-radius:12px;font-size:15px;font-weight:600;">
          Reset Password
        </a>
      </div>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;margin-bottom:24px;">
        <p style="margin:0;color:#166534;font-size:13px;">
          ⏰ This link expires in <strong>1 hour</strong>. If you didn't request this, ignore this email.
        </p>
      </div>

      <p style="margin:0 0 8px;color:#6b7280;font-size:12px;">Or copy this link:</p>
      <p style="margin:0;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:10px 12px;font-size:11px;color:#374151;word-break:break-all;font-family:monospace;">
        ${resetUrl}
      </p>
    </div>

    <div style="padding:20px 40px;border-top:1px solid #f3f4f6;text-align:center;">
      <p style="margin:0;color:#9ca3af;font-size:12px;">
        © ${new Date().getFullYear()} Naija Realty · Sent to ${toEmail}
      </p>
    </div>
  </div>
</body>
</html>`,
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}