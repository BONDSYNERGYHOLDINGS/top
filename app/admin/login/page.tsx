"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      router.push("/admin");
    } else {
      setError(data.error ?? "Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #052e16 0%, #0A4D2E 60%, #166534 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }} />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
           <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(22,163,74,0.15)" }}>
        <Link href="/admin" className="flex items-center justify-center gap-3">
          <div className="relative h-14 w-14  rounded-md p-4">
            <Image
              src={"/logowhite.svg"}
              alt="Top Properties Nigeria Brand"
              fill
              className="object-fill transition-all duration-300 "
              priority
            />
          </div>
        </Link>
      </div>
          <h1 className="font-display font-bold text-2xl text-white">Admin Portal</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(167,243,208,0.7)" }}>Top Properties Nigeria · Property Management</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
          <h2 className="font-semibold text-lg mb-6" style={{ color: "#0A4D2E" }}>Sign in to continue</h2>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-5 text-sm"
              style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
              <AlertCircle size={16} className="shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "#6b7280" }}>
                Username
              </label>
              <input type="text" value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required placeholder="admin"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ border: "1px solid #e5e7eb", color: "#111827" }}
                onFocus={e => (e.target.style.borderColor = "#0A4D2E")}
                onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#6b7280" }}>
                  Password
                </label>
                <Link href="/admin/forgot-password" className="text-xs hover:underline" style={{ color: "#0A4D2E" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all pr-11"
                  style={{ border: "1px solid #e5e7eb", color: "#111827" }}
                  onFocus={e => (e.target.style.borderColor = "#0A4D2E")}
                  onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.01] hover:shadow-lg disabled:opacity-60 mt-2"
              style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
              {loading
                ? <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }} />
                : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(167,243,208,0.5)" }}>
          All right reserved © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}