"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Eye, EyeOff, Save, CheckCircle2, AlertCircle, Loader2, Database, ShieldCheck, User } from "lucide-react";

export default function AdminSettingsPage() {
  // Change password state
  const [pwForm, setPwForm] = useState({ current: "", new: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");

  // Setup auth state
  const [setupEmail, setSetupEmail] = useState("");
  const [setupLoading, setSetupLoading] = useState(false);
  const [setupError, setSetupError] = useState("");
  const [setupSuccess, setSetupSuccess] = useState("");
  const [authSetup, setAuthSetup] = useState<{ setup: boolean; count: number } | null>(null);

  useEffect(() => {
    fetch("/api/admin/setup-auth")
      .then(r => r.json())
      .then(data => setAuthSetup(data))
      .catch(() => setAuthSetup({ setup: false, count: 0 }));
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");

    if (pwForm.new.length < 8) { setPwError("New password must be at least 8 characters"); return; }
    if (pwForm.new !== pwForm.confirm) { setPwError("New passwords do not match"); return; }

    setPwLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.new }),
      });
      const data = await res.json();
      if (data.success) {
        setPwSuccess("Password changed successfully!");
        setPwForm({ current: "", new: "", confirm: "" });
      } else {
        setPwError(data.error ?? "Failed to change password");
      }
    } catch {
      setPwError("Network error. Please try again.");
    } finally {
      setPwLoading(false);
    }
  };

  const handleSetupAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetupError("");
    setSetupSuccess("");
    setSetupLoading(true);

    try {
      const res = await fetch("/api/admin/setup-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: setupEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setSetupSuccess(data.message);
        setAuthSetup({ setup: true, count: 1 });
      } else {
        setSetupError(data.error ?? "Setup failed");
      }
    } catch {
      setSetupError("Network error. Please try again.");
    } finally {
      setSetupLoading(false);
    }
  };

  const strengthScore = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strength = strengthScore(pwForm.new);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"][strength];
  const strengthColor = ["", "#dc2626", "#d97706", "#ca8a04", "#16a34a", "#0A4D2E"][strength];

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
  const inputStyle = { border: "1px solid #e5e7eb", color: "#111827", background: "white" };

  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8" style={{ background: "#f8fafc" }}>
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "#0A4D2E" }}>
            Settings
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
            Manage your account and authentication setup
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
          {/* ── Auth Sheet Setup ── */}
          <div className="rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid #f0fdf4" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "#f0fdf4" }}>
                <Database size={18} style={{ color: "#0A4D2E" }} />
              </div>
              <div>
                <h2 className="font-semibold text-sm" style={{ color: "#111827" }}>Auth Sheet Setup</h2>
                <p className="text-xs" style={{ color: "#6b7280" }}>One-time setup to enable forgot password</p>
              </div>
              {authSetup?.setup && (
                <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  <ShieldCheck size={12} /> Active
                </div>
              )}
            </div>

            {authSetup?.setup ? (
              <div className="p-4 rounded-xl text-sm" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} style={{ color: "#16a34a", marginTop: 1 }} />
                  <div>
                    <p className="font-semibold" style={{ color: "#15803d" }}>Auth sheet is active</p>
                    <p className="text-xs mt-1" style={{ color: "#166534" }}>
                      {authSetup.count} admin user{authSetup.count !== 1 ? "s" : ""} registered.
                      Forgot password emails are enabled.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 rounded-xl text-xs mb-4"
                  style={{ background: "#fffbeb", border: "1px solid #fcd34d", color: "#92400e" }}>
                  ⚠️ Auth sheet not set up yet. Without this, forgot password won&apos;t work.
                  Run this once after connecting Google Sheets.
                </div>

                {setupError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm"
                    style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
                    <AlertCircle size={15} /> {setupError}
                  </div>
                )}
                {setupSuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm"
                    style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
                    <CheckCircle2 size={15} /> {setupSuccess}
                  </div>
                )}

                <form onSubmit={handleSetupAuth} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                      style={{ color: "#6b7280" }}>
                      Your Admin Email
                    </label>
                    <input
                      type="email" value={setupEmail}
                      onChange={e => setSetupEmail(e.target.value)}
                      required placeholder="admin@yourdomain.com"
                      className={inputCls} style={inputStyle}
                    />
                    <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                      Password reset emails will be sent here.
                    </p>
                  </div>
                  <button
                    type="submit" disabled={setupLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.01] disabled:opacity-60"
                    style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
                    {setupLoading
                      ? <><Loader2 size={15} className="animate-spin" /> Setting up...</>
                      : <><Database size={15} /> Set Up Auth Sheet</>}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* ── Change Password ── */}
          <div className="rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid #f0fdf4" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "#f0fdf4" }}>
                <User size={18} style={{ color: "#0A4D2E" }} />
              </div>
              <div>
                <h2 className="font-semibold text-sm" style={{ color: "#111827" }}>Change Password</h2>
                <p className="text-xs" style={{ color: "#6b7280" }}>Update your admin password</p>
              </div>
            </div>

            {pwError && (
              <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm"
                style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
                <AlertCircle size={15} className="shrink-0" /> {pwError}
              </div>
            )}
            {pwSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm"
                style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
                <CheckCircle2 size={15} className="shrink-0" /> {pwSuccess}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "#6b7280" }}>Current Password</label>
                <div className="relative">
                  <input
                    type={showPw.current ? "text" : "password"}
                    value={pwForm.current}
                    onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
                    required placeholder="Your current password"
                    className={`${inputCls} pr-11`} style={inputStyle}
                  />
                  <button type="button"
                    onClick={() => setShowPw(s => ({ ...s, current: !s.current }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}>
                    {showPw.current ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "#6b7280" }}>New Password</label>
                <div className="relative">
                  <input
                    type={showPw.new ? "text" : "password"}
                    value={pwForm.new}
                    onChange={e => setPwForm(f => ({ ...f, new: e.target.value }))}
                    required minLength={8} placeholder="Min. 8 characters"
                    className={`${inputCls} pr-11`} style={inputStyle}
                  />
                  <button type="button"
                    onClick={() => setShowPw(s => ({ ...s, new: !s.new }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}>
                    {showPw.new ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {pwForm.new && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="h-1 flex-1 rounded-full transition-all"
                          style={{ background: i <= strength ? strengthColor : "#e5e7eb" }} />
                      ))}
                    </div>
                    <p className="text-xs font-medium" style={{ color: strengthColor }}>{strengthLabel}</p>
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                  style={{ color: "#6b7280" }}>Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPw.confirm ? "text" : "password"}
                    value={pwForm.confirm}
                    onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
                    required placeholder="Repeat new password"
                    className={`${inputCls} pr-11`}
                    style={{
                      ...inputStyle,
                      border: `1px solid ${
                        pwForm.confirm && pwForm.confirm !== pwForm.new ? "#fca5a5"
                        : pwForm.confirm && pwForm.confirm === pwForm.new ? "#86efac"
                        : "#e5e7eb"
                      }`,
                    }}
                  />
                  <button type="button"
                    onClick={() => setShowPw(s => ({ ...s, confirm: !s.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}>
                    {showPw.confirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {pwForm.confirm && pwForm.confirm !== pwForm.new && (
                  <p className="text-xs mt-1" style={{ color: "#dc2626" }}>Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={pwLoading || (!!pwForm.confirm && pwForm.new !== pwForm.confirm)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.01] hover:shadow-lg disabled:opacity-60"
                style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
                {pwLoading
                  ? <><Loader2 size={15} className="animate-spin" /> Updating...</>
                  : <><Save size={15} /> Update Password</>}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}