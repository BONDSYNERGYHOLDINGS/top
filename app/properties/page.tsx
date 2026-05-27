"use client";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/ui/PropertyCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { properties } from "@/lib/properties";
import { Search, SlidersHorizontal, X } from "lucide-react";

const types = ["All", "House", "Apartment", "Land", "Commercial"];
const states = ["All States", "Lagos", "Abuja", "Port Harcourt", "Enugu"];
const sortOptions = ["Newest First", "Price: Low to High", "Price: High to Low"];

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialType = searchParams.get("type") || "all";

  const [search, setSearch] = useState(initialSearch);
  const [typeFilter, setTypeFilter] = useState(initialType === "all" ? "All" : initialType.charAt(0).toUpperCase() + initialType.slice(1));
  const [stateFilter, setStateFilter] = useState("All States");
  const [sort, setSort] = useState("Newest First");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...properties];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "All") {
      result = result.filter((p) => p.type === typeFilter.toLowerCase());
    }

    if (stateFilter !== "All States") {
      result = result.filter((p) => p.state === stateFilter);
    }

    if (sort === "Price: Low to High") {
      result.sort((a, b) => a.priceRaw - b.priceRaw);
    } else if (sort === "Price: High to Low") {
      result.sort((a, b) => b.priceRaw - a.priceRaw);
    }

    return result;
  }, [search, typeFilter, stateFilter, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-forest-dark to-forest pt-28 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Our Portfolio
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">
            All Properties
          </h1>
          <p className="text-emerald-200/80 text-base">
            Browse {properties.length} premium properties across Nigeria
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 md:top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Type filter */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    typeFilter === t
                      ? "bg-forest text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-forest"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 outline-none bg-white"
            >
              {sortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-semibold text-forest">{filtered.length}</span> properties
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-forest/40" />
            </div>
            <h3 className="font-display font-semibold text-forest text-lg mb-2">No properties found</h3>
            <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setTypeFilter("All"); setStateFilter("All States"); }}
              className="px-6 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center"><div className="text-forest">Loading...</div></div>}>
      <PropertiesContent />
    </Suspense>
  );
}
