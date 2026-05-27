import { Star, Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    name: "Dr. Chukwuemeka Obi", role: "CEO, Fintech Startup", location: "Lagos",
    text: "Top Properties Nigeria transformed my property search from a stressful ordeal into a genuinely enjoyable experience. Their team's knowledge of the Ikoyi market is unmatched. I found my dream villa in just two weeks.",
    rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    name: "Mrs. Amina Hassan", role: "Director, Oil & Gas", location: "Abuja",
    text: "After years of frustrating property searches in Maitama, a colleague recommended Top Properties Nigeria. Within days, they presented three perfect options. The transaction was seamless and professional from start to finish.",
    rating: 5, image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
  {
    name: "Mr. Tunde Babatunde", role: "Real Estate Investor", location: "Lagos",
    text: "I've been investing in Lagos real estate for 15 years and Top Properties Nigeria is by far the most professional agency I've encountered. Their market intelligence and investment guidance have been invaluable to my portfolio.",
    rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: "linear-gradient(to bottom, rgba(240,253,244,0.5), white)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="Client Stories" title="What Our" titleAccent="Clients Say"
          subtitle="Real stories from real clients who found their dream properties through Top Properties Nigeria." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "white", boxShadow: "0 4px 20px rgba(10,77,46,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}>
              <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full" style={{ background: "linear-gradient(to right, transparent, #0A4D2E, transparent)" }} />
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: "#f0fdf4" }}>
                <Quote size={18} style={{ color: "#0A4D2E" }} />
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} style={{ color: "#facc15", fill: "#facc15" }} />)}
              </div>
              <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "#4b5563" }}>"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid #f3f4f6" }}>
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" style={{ outline: "2px solid #dcfce7", outlineOffset: "1px" }} />
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#0A4D2E" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
