import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProperties, getPropertyById } from "@/lib/sheets-helpers";
import { MapPin, Bed, Bath, Maximize2, Calendar, CheckCircle2, ArrowLeft, MessageCircle, Phone, Video } from "lucide-react";
import type { Metadata } from "next";
import PropertyCard from "@/components/ui/PropertyCard";
import ImageLoader from "@/components/ui/ImageLoader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) return { title: "Property Not Found" };
  return { title: property.title, description: property.shortDesc };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

  const whatsappMsg = encodeURIComponent(
    `Hello, I'm interested in: ${property.title} (${property.price}). Please provide more details.`
  );
  const whatsappUrl = `https://wa.me/${property.agent.whatsapp}?text=${whatsappMsg}`;

  const allProps = await getAllProperties();
  const related  = allProps
    .filter(p => p.id !== property.id && p.type === property.type && p.status !== "sold")
    .slice(0, 3);

  const statusLabel = { "for-sale": "For Sale", "for-rent": "For Rent", "sold": "Sold" }[property.status] ?? property.status;
  const statusStyle = {
    "for-sale": { background: "#dcfce7", color: "#15803d" },
    "for-rent": { background: "#dbeafe", color: "#1d4ed8" },
    "sold":     { background: "#fee2e2", color: "#dc2626" },
  }[property.status] ?? { background: "#f3f4f6", color: "#374151" };

  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      {/* Gallery */}
      <div className="pt-20">
        <div style={{
          display: "grid",
          gridTemplateColumns: property.images.length > 1 ? "1fr 1fr" : "1fr",
          gap: "4px",
          height: "clamp(280px, 50vh, 520px)",
        }}>
          {/* Main */}
          <div className="relative overflow-hidden" style={{ gridRow: "1 / -1" }}>
            <ImageLoader
  src={property.images[0]}
  alt={property.title}
  fill
  priority
  className="object-cover"
  sizes="60vw"
/>
            <Link href="/properties"
              className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", color: "#0A4D2E" }}>
              <ArrowLeft size={15} /> Back
            </Link>
          </div>

          {/* Side images */}
          {property.images.length > 1 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "4px",
            }}>
              {property.images.slice(1, 5).map((img, i) => (
                <div key={i} className="relative overflow-hidden">
                  <ImageLoader
  src={img}
  alt={`${property.title} ${i + 2}`}
  fill
  className="object-cover hover:scale-105 transition-transform duration-500"
  sizes="30vw"
/>
                  {i === 3 && property.images.length > 5 && (
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "rgba(10,77,46,0.6)" }}>
                      <span className="text-white font-semibold text-sm">+{property.images.length - 5} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
                  style={{ background: "#f0fdf4", color: "#0A4D2E" }}>{property.type}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={statusStyle}>
                  {statusLabel}
                </span>
                {property.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#fffbeb", color: "#d97706" }}>⭐ Featured</span>
                )}
              </div>
              <h1 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl leading-tight mb-2"
                style={{ color: "#0A4D2E" }}>{property.title}</h1>
              <div className="flex items-center gap-1.5 text-sm" style={{ color: "#6b7280" }}>
                <MapPin size={14} style={{ color: "#16a34a" }} />
                {property.location}
              </div>
            </div>

            {/* Specs */}
            {(property.bedrooms || property.bathrooms || property.area || property.yearBuilt) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {property.bedrooms && (
                  <div className="rounded-xl p-4 text-center" style={{ background: "#f0fdf4" }}>
                    <Bed size={20} style={{ color: "#0A4D2E", margin: "0 auto 4px" }} />
                    <div className="font-bold text-lg" style={{ color: "#0A4D2E" }}>{property.bedrooms}</div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>Bedrooms</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="rounded-xl p-4 text-center" style={{ background: "#f0fdf4" }}>
                    <Bath size={20} style={{ color: "#0A4D2E", margin: "0 auto 4px" }} />
                    <div className="font-bold text-lg" style={{ color: "#0A4D2E" }}>{property.bathrooms}</div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>Bathrooms</div>
                  </div>
                )}
                {property.area && (
                  <div className="rounded-xl p-4 text-center" style={{ background: "#f0fdf4" }}>
                    <Maximize2 size={20} style={{ color: "#0A4D2E", margin: "0 auto 4px" }} />
                    <div className="font-bold text-sm" style={{ color: "#0A4D2E" }}>{property.area}</div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>Plot Size</div>
                  </div>
                )}
                {property.yearBuilt && (
                  <div className="rounded-xl p-4 text-center" style={{ background: "#f0fdf4" }}>
                    <Calendar size={20} style={{ color: "#0A4D2E", margin: "0 auto 4px" }} />
                    <div className="font-bold text-lg" style={{ color: "#0A4D2E" }}>{property.yearBuilt}</div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>Year Built</div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-display font-semibold text-xl mb-4" style={{ color: "#0A4D2E" }}>
                About This Property
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#4b5563", lineHeight: 1.9 }}>
                {property.fullDesc}
              </p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display font-semibold text-xl mb-4" style={{ color: "#0A4D2E" }}>
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "#f0fdf4" }}>
                        <CheckCircle2 size={12} style={{ color: "#0A4D2E" }} />
                      </div>
                      <span className="text-sm" style={{ color: "#374151" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All photos */}
            {/* {property.images.length > 3 && (
              <div className="mb-8">
                <h2 className="font-display font-semibold text-xl mb-4" style={{ color: "#0A4D2E" }}>
                  All Photos
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.images.map((img, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden img-zoom"
                      style={{ aspectRatio: "4/3" }}>
                      <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover"
                        sizes="(max-width:640px) 50vw, 33vw" />
                    </div>
                  ))}
                </div>
              </div>
            )} */}
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky" style={{ top: "96px" }}>
              <div className="rounded-2xl p-6 mb-4"
                style={{ background: "white", boxShadow: "0 4px 24px rgba(10,77,46,0.10), 0 1px 6px rgba(0,0,0,0.04)", border: "1px solid #f0fdf4" }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#9ca3af" }}>Starting from</p>
                <p className="font-display font-bold text-3xl mb-4" style={{ color: "#0A4D2E" }}>
                  {property.price}
                </p>

                <div className="mb-4 pb-4" style={{ borderBottom: "1px solid #f0fdf4" }}>
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#9ca3af" }}>Agent</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0"
                      style={{ background: "linear-gradient(135deg, #0A4D2E, #16a34a)" }}>
                      {property.agent.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#0A4D2E" }}>{property.agent.name}</p>
                      <p className="text-xs" style={{ color: "#9ca3af" }}>Verified Agent</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                    style={{ background: "#25D366" }}>
                    <MessageCircle size={18} /> Chat on WhatsApp
                  </a>
                  <a href={`tel:${property.agent.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                    style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
                    <Phone size={16} /> Call Agent
                  </a>
                  <Link href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                    style={{ border: "2px solid #0A4D2E", color: "#0A4D2E" }}>
                    Send Enquiry
                  </Link>
                   {property.instagramUrl && (
    <a href={property.instagramUrl} target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
      style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}>
      <Video size={16} /> View on Instagram
    </a>
  )}
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-2xl p-5 text-sm" style={{ background: "#f0fdf4" }}>
                <h4 className="font-semibold mb-3 text-sm" style={{ color: "#0A4D2E" }}>Property Summary</h4>
                <div className="space-y-2.5">
                  {[
                    ["Type",     property.type],
                    ["Status",   statusLabel],
                    ...(property.area      ? [["Plot Size",   property.area]]      : []),
                    ...(property.yearBuilt ? [["Year Built",  property.yearBuilt]] : []),
                    ["Location", property.location],
                    ["State",    property.state],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <span style={{ color: "#6b7280" }}>{k}</span>
                      <span className="font-medium text-right capitalize"
                        style={{ color: "#0A4D2E" }}>{v?.replace("-", " ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-10" style={{ borderTop: "1px solid #f3f4f6" }}>
            <h2 className="font-display font-bold text-2xl mb-8" style={{ color: "#0A4D2E" }}>
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}