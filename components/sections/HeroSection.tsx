"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, ChevronDown, Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("all");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/properties?search=${searchQuery}&type=${type}`);
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100svh" }}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=90"
          alt="Luxury Nigerian home"
          fill priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,51,32,0.92) 0%, rgba(10,77,46,0.8) 45%, rgba(22,163,74,0.5) 100%)" }} />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full animate-pulse-slow" style={{ background: "rgba(34,197,94,0.08)", filter: "blur(60px)" }} />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full animate-pulse-slow" style={{ background: "rgba(22,163,74,0.06)", filter: "blur(80px)", animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 animate-fade-up">
            <div className="flex">
              {[1,2,3,4,5].map(i => <Star key={i} size={11} style={{ color: "#facc15", fill: "#facc15" }} />)}
            </div>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "12px" }}>Nigeria&apos;s #1 Luxury Property Platform</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-white leading-tight mb-6 animate-fade-up animate-delay-100"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
            Find Your
            <span className="block" style={{ background: "linear-gradient(135deg, #C9963A, #E0AE52, #C9963A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Dream Home
            </span>
            in Nigeria
          </h1>

          <p className="text-base md:text-lg leading-relaxed mb-10 max-w-xl animate-fade-up animate-delay-200"
            style={{ color: "rgba(209,250,229,0.85)" }}>
            Discover extraordinary properties across Lagos, Abuja, and beyond. From luxury villas to prime land investments.
          </p>

          {/* Search */}
          <div className="animate-fade-up animate-delay-300">
            <form onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-2 max-w-2xl p-2 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "white" }}>
                <MapPin size={18} style={{ color: "#16a34a", flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search location, property type..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm outline-none bg-transparent"
                  style={{ color: "#0A4D2E" }}
                />
              </div>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="rounded-xl px-4 py-3 text-sm outline-none min-w-36"
                style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <option value="all" className="text-gray-800">All Types</option>
                <option value="house" className="text-gray-800">Houses</option>
                <option value="apartment" className="text-gray-800">Apartments</option>
                <option value="land" className="text-gray-800">Land</option>
                <option value="commercial" className="text-gray-800">Commercial</option>
              </select>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105"
                style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}
              >
                <Search size={16} />Search
              </button>
            </form>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Ikoyi", "Victoria Island", "Lekki", "Maitama", "Banana Island"].map(loc => (
                <Link key={loc} href={`/properties?search=${loc}`}
                  className="glass-card px-3 py-1.5 rounded-full text-xs transition-all hover:scale-105"
                  style={{ color: "rgba(255,255,255,0.8)" }}>
                  {loc}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm animate-fade-up animate-delay-400">
            {[{ num: "500+", label: "Properties" }, { num: "2,000+", label: "Happy Clients" }, { num: "15+", label: "Years Exp." }].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-2xl text-white">{s.num}</div>
                <div className="text-xs" style={{ color: "#6ee7b7" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Scroll</span>
        <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
      </div>

      {/* Floating card */}
      {/* <div className="absolute bottom-12 right-8 hidden xl:block glass-card rounded-2xl p-4 w-52 animate-float">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(22,163,74,0.2)" }}>
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">New Listing</p>
            <p className="text-xs" style={{ color: "#6ee7b7" }}>Just added</p>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80"
          alt="Featured property"
          width={200} height={96}
          className="rounded-xl object-cover w-full mb-2" style={{ height: "96px" }}
        />
        <p className="text-white text-xs font-medium line-clamp-1">Luxury Villa, Ikoyi</p>
        <p className="text-xs font-bold" style={{ color: "#6ee7b7" }}>₦450,000,000</p>
      </div> */}
    </section>
  );
}
