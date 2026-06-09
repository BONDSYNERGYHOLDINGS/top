import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllProperties } from "@/lib/sheets-helpers";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import {
  Building2, TrendingUp, CheckCircle2, Tag,
  PlusCircle, ArrowRight, Eye, Pencil
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let properties: any[] = [];
  try { properties = await getAllProperties(); } catch {}

  const total    = properties.length;
  const forSale  = properties.filter(p => p.status === "for-sale").length;
  const sold     = properties.filter(p => p.status === "sold").length;
  const featured = properties.filter(p => p.featured).length;

  const stats = [
    { label: "Total Listings", value: total,    color: "#0A4D2E", bg: "#f0fdf4", icon: Building2 },
    { label: "For Sale",       value: forSale,  color: "#2563eb", bg: "#eff6ff", icon: TrendingUp },
    { label: "Sold / Closed",  value: sold,     color: "#dc2626", bg: "#fef2f2", icon: CheckCircle2 },
    { label: "Featured",       value: featured, color: "#d97706", bg: "#fffbeb", icon: Tag },
  ];

  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />

      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8" style={{ background: "#f8fafc" }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl" style={{ color: "#0A4D2E" }}>
              Welcome  👋
            </h1>
            <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
              Here&apos;s what&apos;s happening with your listings today.
            </p>
          </div>
          <Link
            href="/admin/properties/new"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}
          >
            <PlusCircle size={17} /> Add New Property
          </Link>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, color, bg, icon: Icon }) => (
            <div key={label} className="rounded-2xl p-5"
              style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p className="font-display font-bold text-2xl" style={{ color: "#111827" }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Recent Listings */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid #f3f4f6" }}>
            <h2 className="font-semibold text-sm" style={{ color: "#111827" }}>
              Recent Listings
            </h2>
            <Link href="/admin/properties" className="text-xs font-medium hover:underline"
              style={{ color: "#0A4D2E" }}>
              View all →
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "#f0fdf4" }}>
                <Building2 size={28} style={{ color: "#0A4D2E", opacity: 0.4 }} />
              </div>
              <p className="font-semibold text-sm mb-1" style={{ color: "#374151" }}>
                No properties yet
              </p>
              <p className="text-xs mb-5" style={{ color: "#9ca3af" }}>
                Add your first property listing to get started.
              </p>
              <Link href="/admin/properties/new"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
                style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
                <PlusCircle size={15} /> Add First Property
              </Link>
            </div>
          ) : (
            <div>
              {properties.slice(0, 8).map((p, i) => (
                <div key={p.id}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50"
                  style={{ borderBottom: i < Math.min(properties.length, 8) - 1 ? "1px solid #f9fafb" : "none" }}>
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0"
                    style={{ background: "#f3f4f6" }}>
                    {p.images?.[0] && (
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#111827" }}>{p.title}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "#6b7280" }}>{p.location}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-sm font-semibold" style={{ color: "#0A4D2E" }}>{p.price}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize"
                      style={{
                        background: p.status === "for-sale" ? "#dcfce7" : p.status === "sold" ? "#fee2e2" : "#dbeafe",
                        color: p.status === "for-sale" ? "#15803d" : p.status === "sold" ? "#dc2626" : "#1d4ed8",
                      }}>
                      {p.status.replace("-", " ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/properties/${p.id}`} target="_blank"
                      className="p-2 rounded-lg transition-colors hover:scale-110"
                      style={{ background: "#f0fdf4", color: "#0A4D2E" }}>
                      <Eye size={14} />
                    </Link>
                    <Link href={`/admin/properties/${p.id}`}
                      className="p-2 rounded-lg transition-colors hover:scale-110"
                      style={{ background: "#eff6ff", color: "#2563eb" }}>
                      <Pencil size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}