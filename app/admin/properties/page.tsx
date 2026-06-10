"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { PlusCircle, Pencil, Trash2, Search, RefreshCw, Eye, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface Property {
  id: string; title: string; price: string; location: string;
  type: string; status: string; featured: boolean; images: string[];
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setProperties(data);
      setFiltered(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProperties(); }, []);

  useEffect(() => {
    if (!search) { setFiltered(properties); return; }
    const q = search.toLowerCase();
    setFiltered(properties.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q)
    ));
  }, [search, properties]);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setProperties(prev => prev.filter(p => p.id !== id));
      setConfirmDelete(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setDeleting(null);
    }
  };

  const statusStyle = (s: string) => {
    if (s === "for-sale") return { bg: "#dcfce7", color: "#15803d" };
    if (s === "sold") return { bg: "#fee2e2", color: "#dc2626" };
    return { bg: "#dbeafe", color: "#1d4ed8" };
  };

  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8" style={{ background: "#f8fafc" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="font-display font-bold text-2xl" style={{ color: "#0A4D2E" }}>Properties</h1>
            <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>{filtered.length} listings found</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchProperties} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
              style={{ background: "white", border: "1px solid #e5e7eb", color: "#374151" }}>
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <Link href="/admin/properties/new"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
              <PlusCircle size={16} /> Add Property
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }} />
          <input
            type="text" placeholder="Search by title, location, type..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "white", border: "1px solid #e5e7eb", color: "#111827" }}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl mb-5 text-sm"
            style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
            <AlertTriangle size={16} /> {error}
          </div>
        )}

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#dcfce7", borderTopColor: "#0A4D2E" }} />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-semibold text-sm mb-1" style={{ color: "#374151" }}>No properties found</p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>Try a different search or add a new property</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                    {["Property","Location","Price","Type","Status","Featured","Actions"].map(h => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide" style={{ color: "#6b7280" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => {
                    const ss = statusStyle(p.status);
                    return (
                      <tr key={p.id} className="border-b transition-colors hover:bg-gray-50" style={{ borderColor: "#f3f4f6" }}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ background: "#f3f4f6" }}>
                              {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                            </div>
                            <span className="font-medium line-clamp-1 max-w-48" style={{ color: "#111827" }}>{p.title}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-xs max-w-32 line-clamp-2" style={{ color: "#6b7280" }}>{p.location}</td>
                        <td className="px-5 py-4 font-semibold whitespace-nowrap text-xs" style={{ color: "#0A4D2E" }}>{p.price}</td>
                        <td className="px-5 py-4">
                          <span className="capitalize text-xs px-2.5 py-1 rounded-full" style={{ background: "#f3f4f6", color: "#374151" }}>{p.type}</span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize" style={{ background: ss.bg, color: ss.color }}>
                            {p.status.replace("-"," ")}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {p.featured
                            ? <CheckCircle2 size={18} style={{ color: "#16a34a" }} />
                            : <XCircle size={18} style={{ color: "#d1d5db" }} />}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/properties/${p.id}`} target="_blank"
                              className="p-2 rounded-lg transition-colors hover:scale-110"
                              style={{ background: "#f0fdf4", color: "#0A4D2E" }}>
                              <Eye size={15} />
                            </Link>
                            <Link href={`/admin/properties/${p.id}`}
                              className="p-2 rounded-lg transition-colors hover:scale-110"
                              style={{ background: "#eff6ff", color: "#2563eb" }}>
                              <Pencil size={15} />
                            </Link>
                            <button
                              onClick={() => setConfirmDelete(p.id)}
                              className="p-2 rounded-lg transition-colors hover:scale-110"
                              style={{ background: "#fef2f2", color: "#dc2626" }}>
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete confirm modal */}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#fef2f2" }}>
                <Trash2 size={22} style={{ color: "#dc2626" }} />
              </div>
              <h3 className="font-semibold text-center mb-2" style={{ color: "#111827" }}>Delete Property?</h3>
              <p className="text-sm text-center mb-6" style={{ color: "#6b7280" }}>
                This will permanently remove the property from your Database. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium"
                  style={{ background: "#f3f4f6", color: "#374151" }}>
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  disabled={deleting === confirmDelete}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60"
                  style={{ background: "#dc2626" }}>
                  {deleting === confirmDelete ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
