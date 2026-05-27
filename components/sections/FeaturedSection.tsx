import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyCard from "@/components/ui/PropertyCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { getFeaturedProperties } from "@/lib/properties";

export default function FeaturedSection() {
  const featured = getFeaturedProperties();
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeader
            badge="Featured Listings" title="Handpicked" titleAccent="Luxury Properties"
            subtitle="Exceptional homes curated for the discerning buyer. Each property selected for its prime location, superior quality, and investment potential."
            centered={false}
          />
          <Link href="/properties"
            className="flex items-center gap-2 font-semibold text-sm transition-all group shrink-0"
            style={{ color: "#0A4D2E" }}>
            View All Properties
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.slice(0, 4).map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      </div>
    </section>
  );
}
