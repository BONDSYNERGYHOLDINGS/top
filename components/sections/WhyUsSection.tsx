import { Shield, Award, Clock, Users, TrendingUp, Headphones } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const features = [
  { icon: Shield, title: "Verified Properties", desc: "Every property undergoes rigorous due diligence. We verify ownership documents, C-of-O, and legal status before listing." },
  { icon: Award, title: "Premium Portfolio", desc: "We specialize exclusively in premium properties. Only the finest homes, apartments, and investment-grade real estate make our portfolio." },
  { icon: Clock, title: "Fast Transactions", desc: "Our expert team handles all paperwork, surveys, and legal processes for the fastest, smoothest property transactions in Nigeria." },
  { icon: Users, title: "Trusted Network", desc: "2,000+ satisfied clients and counting. Our extensive network of buyers, sellers, and developers gives you unparalleled market access." },
  { icon: TrendingUp, title: "Investment Guidance", desc: "Expert market analysis and investment advice to help you identify properties with the best ROI potential in Nigeria's growing market." },
  { icon: Headphones, title: "24/7 Support", desc: "Our dedicated client services team is available round the clock via WhatsApp, phone, and email for every question." },
];

export default function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #052e16 0%, #0A4D2E 50%, #063320 100%)" }}>
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full" style={{ background: "rgba(74,222,128,0.06)", filter: "blur(80px)" }} />
        <div className="absolute bottom-10 right-40 w-64 h-64 rounded-full" style={{ background: "rgba(34,197,94,0.05)", filter: "blur(60px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Why Top Properties Nigeria"
          title="The Standard for"
          titleAccent="Real Estate Excellence"
          subtitle="We've built Nigeria's most trusted luxury real estate platform on a foundation of integrity, expertise, and exceptional client service."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(10,77,46,0.2)", backdropFilter: "blur(16px)", border: "1px solid rgba(22,163,74,0.15)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: "linear-gradient(135deg, rgba(22,163,74,0.25), rgba(74,222,128,0.15))" }}>
                <feature.icon size={22} style={{ color: "#6ee7b7" }} />
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(167,243,208,0.7)" }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
