"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Database, CheckCircle2, AlertCircle, Loader2, ExternalLink, ChevronRight } from "lucide-react";

interface SeedResult {
  success: boolean;
  message: string;
  inserted: number;
  skipped: number;
  error?: string;
}

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SeedResult | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/sheets/seed", { method: "POST" });
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setResult({ success: false, message: "", error: e.message, inserted: 0, skipped: 0 });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      num: "01", title: "Create Google Sheet",
      desc: 'Create a new Google Spreadsheet. Rename the first tab to "Properties" (exact match, case-sensitive).',
      link: { label: "Open Google Sheets", href: "https://sheets.google.com" },
    },
    {
      num: "02", title: "Create Service Account",
      desc: "Go to Google Cloud Console → IAM & Admin → Service Accounts → Create. Download the JSON key file.",
      link: { label: "Google Cloud Console", href: "https://console.cloud.google.com" },
    },
    {
      num: "03", title: "Enable Sheets API",
      desc: 'In Google Cloud Console, search for "Google Sheets API" and enable it for your project.',
    },
    {
      num: "04", title: "Share Your Sheet",
      desc: "Open the JSON key file, copy the client_email value, and share your spreadsheet with that email as Editor.",
    },
    {
      num: "05", title: "Set Environment Variables",
      desc: "Add the variables below to your .env.local file, then restart your dev server.",
    },
    {
      num: "06", title: "Seed the Database",
      desc: 'Click "Seed Google Sheet" below to populate all 20 properties into your spreadsheet in one click.',
    },
  ];

  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8" style={{ background: "#f8fafc" }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "#0A4D2E" }}>
            Seed Database
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
            Ingest all existing properties into Google Sheets in one click
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Setup Guide */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
              <h2 className="font-semibold text-base mb-5" style={{ color: "#111827" }}>
                📋 Setup Guide
              </h2>
              <div className="space-y-5">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs"
                      style={{ background: "linear-gradient(135deg, #0A4D2E, #16a34a)", color: "white" }}>
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1" style={{ color: "#111827" }}>{step.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>{step.desc}</p>
                      {step.link && (
                        <a href={step.link.href} target="_blank"
                          className="inline-flex items-center gap-1 text-xs font-medium mt-1.5 hover:underline"
                          style={{ color: "#0A4D2E" }}>
                          {step.link.label} <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Env vars */}
            <div className="rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
              <h2 className="font-semibold text-base mb-4" style={{ color: "#111827" }}>
                🔐 Required Environment Variables
              </h2>
              <pre className="text-xs p-4 rounded-xl overflow-x-auto leading-7"
                style={{ background: "#0f172a", color: "#e2e8f0" }}>
{`# .env.local

# ── Google Sheets ────────────────────────────
# The long ID from your spreadsheet URL
# https://docs.google.com/spreadsheets/d/THIS_PART/edit
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms

# Paste the entire contents of your service account JSON key
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"your-project",...}

# ── Cloudinary ───────────────────────────────
CLOUDINARY_CLOUD_NAME=dqzsdgugd
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# ── Admin Auth ───────────────────────────────
ADMIN_USERNAME=admin
ADMIN_PASSWORD=choose_a_strong_password
ADMIN_JWT_SECRET=random_32_char_string_here`}
              </pre>

              <div className="mt-4 p-4 rounded-xl text-xs" style={{ background: "#f0fdf4", color: "#166534" }}>
                <p className="font-semibold mb-2">💡 Sheet Column Structure (auto-created on seed):</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 font-mono">
                  {[
                    ["A","id"], ["B","title"], ["C","price"], ["D","priceRaw"],
                    ["E","location"], ["F","state"], ["G","shortDesc"], ["H","fullDesc"],
                    ["I","type"], ["J","status"], ["K","bedrooms"], ["L","bathrooms"],
                    ["M","area"], ["N","yearBuilt"], ["O","features (pipe-separated)"],
                    ["P","images (pipe-separated URLs)"], ["Q","featured (TRUE/FALSE)"],
                    ["R","agentName"], ["S","agentPhone"], ["T","agentWhatsapp"],
                  ].map(([col, field]) => (
                    <p key={col}><span className="font-bold">{col}</span> → {field}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Seed Action */}
          <div className="space-y-4">
            <div className="rounded-2xl p-6 sticky top-8" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
                <Database size={26} style={{ color: "#0A4D2E" }} />
              </div>

              <h2 className="font-semibold text-base text-center mb-1" style={{ color: "#111827" }}>
                Seed Google Sheet
              </h2>
              <p className="text-xs text-center mb-6" style={{ color: "#6b7280" }}>
                Inserts all <strong>20 properties</strong> from your existing data into the connected spreadsheet. Skips duplicates automatically.
              </p>

              {/* Property count preview */}
              <div className="rounded-xl p-3 mb-5 space-y-2" style={{ background: "#f9fafb" }}>
                {[
                  { label: "Land plots", count: 12 },
                  { label: "Houses / Duplexes", count: 5 },
                  { label: "Apartments", count: 1 },
                  { label: "Sold / Closed", count: 6 },
                ].map(({ label, count }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span style={{ color: "#6b7280" }}>{label}</span>
                    <span className="font-semibold" style={{ color: "#111827" }}>{count}</span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between text-sm font-semibold" style={{ borderTop: "1px solid #e5e7eb" }}>
                  <span style={{ color: "#0A4D2E" }}>Total</span>
                  <span style={{ color: "#0A4D2E" }}>20</span>
                </div>
              </div>

              <button
                onClick={handleSeed}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
                style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}
              >
                {loading
                  ? <><Loader2 size={18} className="animate-spin" /> Seeding...</>
                  : <><Database size={18} /> Seed Google Sheet</>}
              </button>

              {/* Result */}
              {result && (
                <div className="mt-4 p-4 rounded-xl text-sm"
                  style={{
                    background: result.success ? "#f0fdf4" : "#fef2f2",
                    border: `1px solid ${result.success ? "#bbf7d0" : "#fecaca"}`,
                  }}>
                  <div className="flex items-start gap-2">
                    {result.success
                      ? <CheckCircle2 size={16} style={{ color: "#16a34a", marginTop: 1 }} />
                      : <AlertCircle size={16} style={{ color: "#dc2626", marginTop: 1 }} />}
                    <div>
                      <p className="font-semibold" style={{ color: result.success ? "#15803d" : "#dc2626" }}>
                        {result.success ? "Success!" : "Error"}
                      </p>
                      <p className="text-xs mt-1" style={{ color: result.success ? "#166534" : "#dc2626" }}>
                        {result.message || result.error}
                      </p>
                      {result.success && (
                        <div className="mt-2 space-y-1 text-xs" style={{ color: "#166534" }}>
                          <p>✅ Inserted: <strong>{result.inserted}</strong></p>
                          <p>⏭️ Skipped: <strong>{result.skipped}</strong></p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-xs text-center mt-4" style={{ color: "#9ca3af" }}>
                Safe to run multiple times — duplicates are skipped
              </p>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "#6b7280" }}>QUICK LINKS</p>
              <div className="space-y-2">
                {[
                  { label: "View All Properties", href: "/admin/properties" },
                  { label: "Add New Property", href: "/admin/properties/new" },
                  { label: "Back to Dashboard", href: "/admin" },
                  { label: "View Live Site", href: "/", external: true },
                ].map(({ label, href, external }) => (
                  <a key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    className="flex items-center justify-between text-xs px-3 py-2.5 rounded-xl transition-all hover:scale-[1.01]"
                    style={{ background: "#f9fafb", color: "#374151" }}>
                    {label}
                    <ChevronRight size={14} style={{ color: "#9ca3af" }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
