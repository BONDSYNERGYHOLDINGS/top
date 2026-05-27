import Link from "next/link";
import Image from "next/image";
import { MapPin, Bed, Bath, Maximize2, ArrowRight } from "lucide-react";
import { Property } from "@/lib/properties";

const statusColors: Record<Property["status"], { bg: string; text: string }> = {
  "for-sale": { bg: "#16a34a", text: "white" },
  "for-rent": { bg: "#2563eb", text: "white" },
  "sold": { bg: "#6b7280", text: "white" },
};
const statusLabels: Record<Property["status"], string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  "sold": "Sold",
};
const typeLabels: Record<Property["type"], string> = {
  house: "House", apartment: "Apartment", land: "Land", commercial: "Commercial",
};

export default function PropertyCard({ property }: { property: Property }) {
  const sc = statusColors[property.status];
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ background: "white", boxShadow: "0 4px 20px rgba(10,77,46,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-emerald-50" style={{ aspectRatio: "4/3" }}>
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,46,22,0.75) 0%, transparent 55%)" }} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: sc.bg, color: sc.text }}>
            {statusLabels[property.status]}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: "rgba(0,0,0,0.35)", color: "white", backdropFilter: "blur(4px)" }}>
            {typeLabels[property.type]}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <p className="text-white font-display font-bold text-xl leading-tight drop-shadow-lg">
            {property.price}
          </p>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}
          >
            <ArrowRight size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-base leading-snug mb-1.5 line-clamp-1 transition-colors" style={{ color: "#0A4D2E" }}>
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: "#6b7280" }}>
          <MapPin size={12} style={{ color: "#16a34a", flexShrink: 0 }} />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: "#9ca3af" }}>
          {property.shortDesc}
        </p>

        {(property.bedrooms || property.bathrooms || property.area) && (
          <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid #f0fdf4" }}>
            {property.bedrooms && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "#4b5563" }}>
                <Bed size={13} style={{ color: "#16a34a" }} />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "#4b5563" }}>
                <Bath size={13} style={{ color: "#16a34a" }} />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1.5 text-xs ml-auto" style={{ color: "#4b5563" }}>
                <Maximize2 size={12} style={{ color: "#16a34a" }} />
                <span>{property.area}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
