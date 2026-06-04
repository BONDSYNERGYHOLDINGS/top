import { getAdminSession } from "@/lib/auth";
import { getAllProperties } from "@/lib/sheets";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Building2, TrendingUp, CheckCircle2, Clock, PlusCircle, Database, ArrowRight } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let properties: any[] = [];
  let sheetsError = false;

  try {
    properties = await getAllProperties();
  } catch {
    sheetsError = true;
  }

  const total = properties.length;
  const forSale = properties.filter(p => p.status === "for-sale").length;
  const sold = properties.filter(p => p.status === "sold").length;
  const featured = properties.filter(p => p.featured).length;

  const statCards = [
    { label: "Total Listings", value: total, icon: Building2, color: "#0A4D2E", bg: "#f0fdf4" },
    { label: "For Sale", value: forSale, icon: TrendingUp, color: "#2563eb", bg: "#eff6ff" },
    { label: "Sold / Closed", value: sold, icon: CheckCircle2, color: "#dc2626", bg: "#fef2f2" },
    { label: "Featured", value: featured, icon: Clock, color: "#d97706", bg: "#fffbeb" },
  ];

  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />

      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8" style={{ background: "#f8fafc" }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "#0A4D2E" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
            Welcome back, {session.username}. Here's your property overview.
          </p>
        </div>

        {/* Sheets warning */}
        {sheetsError && (
          <div className="mb-6 p-4 rounded-xl text-sm flex items-start gap-3"
            style={{ background: "#fffbeb", border: "1px solid #fcd34d", color: "#92400e" }}>
            <span className="text-lg">⚠️</span>
            <div>
              <p className="font-semibold mb-1">Google Sheets not connected</p>
              <p>Add your environment variables to connect to the spreadsheet. See the setup guide below.</p>
            </div>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="rounded-2xl p-5" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
              </div>
              <p className="font-display font-bold text-2xl mb-0.5" style={{ color: "#111827" }}>{value}</p>
              <p className="text-xs" style={{ color: "#6b7280" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/admin/properties/new"
            className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-[1.01]"
            style={{ background: "linear-gradient(135deg, #0A4D2E, #16a34a)", boxShadow: "0 4px 16px rgba(10,77,46,0.3)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
              <PlusCircle size={22} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Add New Property</p>
              <p className="text-xs" style={{ color: "rgba(209,250,229,0.8)" }}>Create a new listing in the sheet</p>
            </div>
            <ArrowRight size={18} className="text-white ml-auto" />
          </Link>

          <Link href="/admin/seed"
            className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-[1.01]"
            style={{ background: "white", border: "2px solid #0A4D2E", boxShadow: "0 4px 16px rgba(10,77,46,0.08)" }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#f0fdf4" }}>
              <Database size={22} style={{ color: "#0A4D2E" }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "#0A4D2E" }}>Seed Google Sheet</p>
              <p className="text-xs" style={{ color: "#6b7280" }}>Ingest all {`${total || 20}`} existing properties</p>
            </div>
            <ArrowRight size={18} style={{ color: "#0A4D2E" }} className="ml-auto" />
          </Link>
        </div>

        {/* Recent Properties */}
        {properties.length > 0 && (
          <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#f3f4f6" }}>
              <h2 className="font-semibold text-sm" style={{ color: "#111827" }}>Recent Properties</h2>
              <Link href="/admin/properties" className="text-xs font-medium" style={{ color: "#0A4D2E" }}>
                View all →
              </Link>
            </div>
            <div className="divide-y" style={{ borderColor: "#f9fafb" }}>
              {properties.slice(0, 6).map(p => (
                <div key={p.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    {p.images?.[0] && (
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#111827" }}>{p.title}</p>
                    <p className="text-xs truncate" style={{ color: "#6b7280" }}>{p.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold" style={{ color: "#0A4D2E" }}>{p.price}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: p.status === "for-sale" ? "#dcfce7" : p.status === "sold" ? "#fee2e2" : "#dbeafe",
                        color: p.status === "for-sale" ? "#15803d" : p.status === "sold" ? "#dc2626" : "#1d4ed8",
                      }}>
                      {p.status}
                    </span>
                  </div>
                  <Link href={`/admin/properties/${p.id}`} className="text-xs px-3 py-1.5 rounded-lg shrink-0 transition-colors"
                    style={{ background: "#f0fdf4", color: "#0A4D2E" }}>
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Setup Guide */}
        <div className="mt-6 rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <h3 className="font-semibold text-sm mb-4" style={{ color: "#111827" }}>⚙️ Environment Setup</h3>
          <p className="text-xs mb-3" style={{ color: "#6b7280" }}>Add these to your <code className="px-1 rounded" style={{ background: "#f3f4f6" }}>.env.local</code> file:</p>
          <pre className="text-xs p-4 rounded-xl overflow-x-auto"
            style={{ background: "#1e293b", color: "#e2e8f0", lineHeight: 1.8 }}>
{`# Google Sheets
GOOGLE_SHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":...}

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin Auth
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
ADMIN_JWT_SECRET=your_random_32char_secret`}
          </pre>
          <div className="mt-4 p-4 rounded-xl text-xs space-y-1" style={{ background: "#f0fdf4", color: "#166534" }}>
            <p className="font-semibold">Google Sheets Setup Steps:</p>
            <p>1. Create a Google Sheet and name the first tab <strong>Properties</strong></p>
            <p>2. Go to Google Cloud Console → Create a Service Account</p>
            <p>3. Download the JSON key and paste it as <code>GOOGLE_SERVICE_ACCOUNT_JSON</code></p>
            <p>4. Share your sheet with the service account email (Editor access)</p>
            <p>5. Copy the Sheet ID from the URL and set as <code>GOOGLE_SHEET_ID</code></p>
            <p>6. Visit <strong>/admin/seed</strong> to populate your sheet with all properties</p>
          </div>
        </div>
      </main>
    </div>
  );
}
