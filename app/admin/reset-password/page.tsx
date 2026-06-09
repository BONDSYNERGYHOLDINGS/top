"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [tokenValid, setTokenValid] = useState<boolean | null>(null); // null = checking
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [showPw, setShowPw] = useState({ new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // Verify token on mount
  useEffect(() => {
    if (!token) return;

    fetch(`/api/admin/reset-password?token=${token}`)
      .then(r => r.json())
      .then(data => setTokenValid(data.valid))
      .catch(() => setTokenValid(false));
  }, [token]);

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: form.newPassword }),
      });
      const data = await res.json();

      if (data.success) {
        setDone(true);
        setTimeout(() => router.push("/admin/login"), 3000);
      } else {
        setError(data.error ?? "Failed to reset password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strengthScore = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = strengthScore(form.newPassword);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][strength];
  const strengthColor = ["", "#dc2626", "#d97706", "#ca8a04", "#16a34a", "#0A4D2E"][strength];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #052e16 0%, #0A4D2E 60%, #166534 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <span className="font-display font-bold text-white text-2xl">N</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Set New Password</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(167,243,208,0.7)" }}>Naija Realty · Admin Portal</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
          {/* Checking token */}
          {tokenValid === null && (
            <div className="flex flex-col items-center py-8 gap-3">
              <Loader2 size={28} className="animate-spin" style={{ color: "#0A4D2E" }} />
              <p className="text-sm" style={{ color: "#6b7280" }}>Verifying your reset link...</p>
            </div>
          )}

          {/* Invalid token */}
          {tokenValid === false && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#fef2f2" }}>
                <AlertCircle size={32} style={{ color: "#dc2626" }} />
              </div>
              <h2 className="font-semibold text-lg mb-2" style={{ color: "#111827" }}>
                Link Invalid or Expired
              </h2>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#6b7280" }}>
                This password reset link is invalid or has expired.
                Reset links are only valid for <strong>1 hour</strong>.
              </p>
              <Link href="/admin/forgot-password"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.01]"
                style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)", color: "white" }}>
                Request a New Link
              </Link>
            </div>
          )}

          {/* Success */}
          {done && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#f0fdf4" }}>
                <CheckCircle2 size={32} style={{ color: "#16a34a" }} />
              </div>
              <h2 className="font-semibold text-lg mb-2" style={{ color: "#0A4D2E" }}>
                Password Reset!
              </h2>
              <p className="text-sm mb-2" style={{ color: "#6b7280" }}>
                Your password has been updated successfully.
              </p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                Redirecting to login in 3 seconds...
              </p>
            </div>
          )}

          {/* Form */}
          {tokenValid === true && !done && (
            <>
              <div className="flex items-center gap-2 p-3 rounded-xl mb-5"
                style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <ShieldCheck size={16} style={{ color: "#16a34a", flexShrink: 0 }} />
                <p className="text-xs" style={{ color: "#166534" }}>
                  Link verified. Choose a strong new password.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm"
                  style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
                  <AlertCircle size={16} className="shrink-0" /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New password */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: "#6b7280" }}>
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPw.new ? "text" : "password"}
                      value={form.newPassword}
                      onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
                      required minLength={8}
                      placeholder="Min. 8 characters"
                      className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                      style={{ border: "1px solid #e5e7eb", color: "#111827" }}
                      onFocus={e => (e.target.style.borderColor = "#0A4D2E")}
                      onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                    />
                    <button type="button" onClick={() => setShowPw(s => ({ ...s, new: !s.new }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}>
                      {showPw.new ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {form.newPassword && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1,2,3,4,5].map(i => (
                          <div key={i} className="h-1 flex-1 rounded-full transition-all"
                            style={{ background: i <= strength ? strengthColor : "#e5e7eb" }} />
                        ))}
                      </div>
                      <p className="text-xs font-medium" style={{ color: strengthColor }}>
                        {strengthLabel}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: "#6b7280" }}>
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPw.confirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                      required
                      placeholder="Repeat new password"
                      className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                      style={{
                        border: `1px solid ${
                          form.confirmPassword && form.confirmPassword !== form.newPassword
                            ? "#fca5a5"
                            : form.confirmPassword && form.confirmPassword === form.newPassword
                            ? "#86efac"
                            : "#e5e7eb"
                        }`,
                        color: "#111827",
                      }}
                    />
                    <button type="button" onClick={() => setShowPw(s => ({ ...s, confirm: !s.confirm }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}>
                      {showPw.confirm ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {form.confirmPassword && form.confirmPassword !== form.newPassword && (
                    <p className="text-xs mt-1" style={{ color: "#dc2626" }}>Passwords do not match</p>
                  )}
                  {form.confirmPassword && form.confirmPassword === form.newPassword && (
                    <p className="text-xs mt-1" style={{ color: "#16a34a" }}>✓ Passwords match</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || form.newPassword !== form.confirmPassword}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.01] hover:shadow-lg disabled:opacity-60 mt-2"
                  style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}
                >
                  {loading
                    ? <><Loader2 size={17} className="animate-spin" /> Updating...</>
                    : "Update Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #052e16, #0A4D2E)" }}>
        <Loader2 size={28} className="animate-spin text-white" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}