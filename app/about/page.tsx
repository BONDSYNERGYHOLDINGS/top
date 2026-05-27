import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import StatsBar from "@/components/ui/StatsBar";
import CTASection from "@/components/sections/CTASection";
import { Award, Users, Target, Heart, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Top Properties Nigeria — Nigeria's premier luxury real estate agency with 15+ years of experience.",
};

const team = [
  {
    name: "Adebayo Okafor",
    role: "Founder & CEO",
    location: "Lagos",
    bio: "15+ years in luxury real estate. Former Director at a top Nigerian property firm.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Chisom Nwosu",
    role: "Head of Sales",
    location: "Lagos",
    bio: "Expert in Victoria Island and Ikoyi market. Over ₦10B in transactions closed.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Fatima Aliyu",
    role: "Abuja Director",
    location: "Abuja",
    bio: "Specialist in Maitama and Asokoro premium properties for over a decade.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80",
  },
  {
    name: "Tunde Bakare",
    role: "Investments Advisor",
    location: "Lagos",
    bio: "Chartered surveyor and property investment strategist with a proven track record.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
];

const values = [
  { icon: Award, title: "Excellence", desc: "We set the gold standard in Nigerian real estate, accepting nothing less than extraordinary." },
  { icon: Target, title: "Integrity", desc: "Every transaction conducted with complete transparency, honesty, and ethical practice." },
  { icon: Users, title: "Client-First", desc: "Your dreams and investment goals are our north star. We exist to serve your property vision." },
  { icon: Heart, title: "Community", desc: "Building Nigeria, one premium property at a time. We reinvest in the communities we serve." },
];

const stats = [
  { value: "2009", label: "Founded", suffix: "" },
  { value: "₦200B", label: "Transactions", suffix: "+" },
  { value: "2,000", label: "Clients Served", suffix: "+" },
  { value: "15", label: "Years of Excellence", suffix: "+" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #052e16 0%, #0A4D2E 60%, #166534 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Our Story
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Nigeria&apos;s Most
              <span className="block" style={{ background: "linear-gradient(135deg, #C9963A, #E0AE52)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Trusted Realty</span>
            </h1>
            <p className="text-emerald-200 text-base md:text-lg leading-relaxed mb-8" style={{ opacity: 0.8 }}>
              Since 2009, we have been Nigeria&apos;s most trusted name in luxury real estate — connecting exceptional buyers with extraordinary properties and delivering results that exceed expectations.
            </p>
            <Link href="/properties" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-forest font-semibold text-sm hover:bg-emerald-50 transition-all hover:shadow-lg">
              View Properties
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsBar stats={stats} dark />
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                badge="Our Purpose"
                title="Built on Trust,"
                titleAccent="Driven by Results"
                subtitle="We believe everyone deserves access to exceptional real estate guidance. Our mission is to make premium property ownership in Nigeria accessible, transparent, and rewarding."
                centered={false}
              />
              <div className="space-y-4 mb-8">
                {[
                  "Nigeria's first luxury-focused real estate platform",
                  "Fully verified properties with clear documentation",
                  "Expert investment guidance backed by market data",
                  "End-to-end support from search to handover",
                  "Transparent pricing with no hidden fees",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-green-mid mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-card-hover">
                <Image
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85"
                  alt="Luxury home interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-luxury p-5">
                <p className="font-display font-bold text-3xl text-forest">₦200B+</p>
                <p className="text-gray-500 text-xs">In transactions completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="What We Stand For"
            title="Our Core"
            titleAccent="Values"
            subtitle="The principles that have guided us for over 15 years."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-luxury hover:shadow-card-hover transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest to-green-mid flex items-center justify-center mb-4">
                  <value.icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-forest mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="The Dream Team"
            title="Meet Our"
            titleAccent="Expert Agents"
            subtitle="A handpicked team of Nigeria's finest real estate professionals."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-card-hover transition-all hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-display font-semibold text-sm">{member.name}</p>
                    <p className="text-emerald-300 text-xs">{member.role}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                  <p className="text-green-mid text-xs font-medium mt-2">{member.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
