"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/ui/PropertyCard";
import { Search, X } from "lucide-react";

interface Property {
  id: string; title: string; price: string; priceRaw: number;
  location: string; state: string; shortDesc: string;
  type: string; status: string; featured: boolean; images: string[];
  bedrooms?: string; bathrooms?: string; area?: string;
}

const TYPES   = ["All", "house", "apartment", "land", "commercial"];
const SORTS   = ["Newest Listing", "Price: Low to High", "Price: High to Low"];
const typeLabel = (t: string) =>
  ({ house: "Houses", apartment: "Apartments", land: "Land", commercial: "Commercial" }[t] ?? t);

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState(searchParams.get("search") || "");
  const [type, setType]             = useState(searchParams.get("type") || "All");
  const [sort, setSort]             = useState("Default");

  useEffect(() => {
    fetch("/api/properties")
      .then(r => r.json())
      .then(data => { setProperties(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let r = [...properties];
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.state?.toLowerCase().includes(q)
      );
    }
    if (type !== "All") r = r.filter(p => p.type === type);
    if (sort === "Price: Low to High") r.sort((a, b) => a.priceRaw - b.priceRaw);
    if (sort === "Price: High to Low") r.sort((a, b) => b.priceRaw - a.priceRaw);
    return r;
  }, [properties, search, type, sort]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <div className="pt-28 pb-14 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #052e16 0%, #0A4D2E 60%, #166534 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white uppercase mb-4"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Our Portfolio
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">
            All Properties
          </h1>
          <p className="text-base" style={{ color: "rgba(167,243,208,0.8)" }}>
            Browse {loading ? "..." : properties.length} properties across Nigeria
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky z-30 bg-white border-b"
        style={{ top: "72px", borderColor: "#e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 flex items-center gap-2 rounded-xl px-4 py-2.5"
              style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}>
              <Search size={15} style={{ color: "#9ca3af", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search by title, location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "#111827" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ color: "#9ca3af" }}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Type chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
              {TYPES.map(t => (
                <button key={t} onClick={() => setType(t)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all hover:scale-105"
                  style={{
                    background: type === t ? "#0A4D2E" : "#f3f4f6",
                    color:      type === t ? "white"    : "#374151",
                  }}>
                  {t === "All" ? "All Types" : typeLabel(t)}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-xs outline-none"
              style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151" }}>
              {SORTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
          Showing <span className="font-semibold" style={{ color: "#0A4D2E" }}>{filtered.length}</span> properties
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "white" }}>
                <div style={{ aspectRatio: "4/3", background: "#f3f4f6" }} />
                <div className="p-5 space-y-3">
                  <div className="h-4 rounded-lg" style={{ background: "#f3f4f6", width: "75%" }} />
                  <div className="h-3 rounded-lg" style={{ background: "#f3f4f6", width: "50%" }} />
                  <div className="h-3 rounded-lg" style={{ background: "#f3f4f6" }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "#f0fdf4" }}>
              <Search size={32} style={{ color: "#0A4D2E", opacity: 0.4 }} />
            </div>
            <p className="font-display font-semibold text-lg mb-2" style={{ color: "#0A4D2E" }}>
              No properties found
            </p>
            <p className="text-sm mb-6" style={{ color: "#6b7280" }}>Try adjusting your filters</p>
            <button
              onClick={() => { setSearch(""); setType("All"); }}
              className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{ background: "#0A4D2E" }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f8fafc" }}>
        <div className="w-8 h-8 border-2 rounded-full animate-spin"
          style={{ borderColor: "#dcfce7", borderTopColor: "#0A4D2E" }} />
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}