"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(data.error ?? "Something went wrong");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="font-display font-bold text-2xl text-white">Forgot Password</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(167,243,208,0.7)" }}>
            We&apos;ll send a reset link to your email
          </p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
          {sent ? (
            /* Success state */
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#f0fdf4" }}>
                <CheckCircle2 size={32} style={{ color: "#16a34a" }} />
              </div>
              <h2 className="font-semibold text-lg mb-2" style={{ color: "#0A4D2E" }}>Check your email</h2>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "#6b7280" }}>
                If an account exists for <strong style={{ color: "#111827" }}>{email}</strong>, you&apos;ll receive
                a password reset link within a few minutes.
              </p>
              <div className="p-3 rounded-xl text-xs mb-6" style={{ background: "#f0fdf4", color: "#166534" }}>
                ⏰ The link expires in <strong>1 hour</strong>. Check your spam folder if you don&apos;t see it.
              </div>
              <Link href="/admin/login"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.01]"
                style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)", color: "white" }}>
                Back to Login
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <h2 className="font-semibold text-lg mb-2" style={{ color: "#0A4D2E" }}>Reset your password</h2>
              <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
                Enter the email address linked to your admin account.
              </p>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm"
                  style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
                  <AlertCircle size={16} className="shrink-0" /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: "#6b7280" }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: "#9ca3af" }} />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="admin@example.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ border: "1px solid #e5e7eb", color: "#111827" }}
                      onFocus={e => (e.target.style.borderColor = "#0A4D2E")}
                      onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.01] hover:shadow-lg disabled:opacity-60"
                  style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}
                >
                  {loading
                    ? <><Loader2 size={17} className="animate-spin" /> Sending...</>
                    : "Send Reset Link"}
                </button>
              </form>

              <div className="mt-5 text-center">
                <Link href="/admin/login"
                  className="inline-flex items-center gap-1.5 text-sm transition-colors"
                  style={{ color: "#6b7280" }}>
                  <ArrowLeft size={14} /> Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}