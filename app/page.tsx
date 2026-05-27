import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedSection from "@/components/sections/FeaturedSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import StatsBar from "@/components/ui/StatsBar";

const stats = [
  { value: "500", label: "Premium Listings", suffix: "+" },
  { value: "₦200B", label: "Property Portfolio", suffix: "+" },
  { value: "2,000", label: "Happy Clients", suffix: "+" },
  { value: "15", label: "Years of Excellence", suffix: "+" },
];

export default function HomePage() {
  return (
    <>

    
      <HeroSection />

      {/* Stats Banner */}
      <section className="py-12 bg-gradient-to-r from-forest to-green-mid">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsBar stats={stats} dark />
        </div>
      </section>

      <FeaturedSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
