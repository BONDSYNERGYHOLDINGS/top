import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, Share2, Globe, Rss, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-white relative overflow-hidden" style={{ background: "#042614" }}>
      <div className="h-0.5" style={{ background: "linear-gradient(to right, transparent, #16a34a, transparent)" }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: "rgba(22,163,74,0.04)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: "rgba(74,222,128,0.03)", filter: "blur(60px)" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
           
              <div className="flex flex-col leading-none text-white">
                
         
  <div className="relative h-14 w-14">
    <Image
      src={"/logowhite.svg"}
      alt="Top Properties Nigeria"
      fill
      className="object-fill transition-all duration-300"
      priority
    />
  </div>

              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(167,243,208,0.6)" }}>
              Nigeria's premier Properties platform. Connecting discerning buyers with extraordinary properties across Lagos, Abuja, and beyond.
            </p>
            <div className="flex gap-3">
              {[Share2, Globe, MessageCircle, Rss].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(22,163,74,0.2)" }}>
                  <Icon size={16} style={{ color: "#6ee7b7" }} />
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-base">Quick Links</h4>
            <ul className="space-y-3">
              {[{ label: "Home", href: "/" }, { label: "All Properties", href: "/properties" }, { label: "About Us", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "List Property", href: "/contact" }].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center gap-2 text-sm transition-colors group" style={{ color: "rgba(167,243,208,0.6)" }}>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" style={{ color: "#16a34a" }} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Property Types */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-base">Property Types</h4>
            <ul className="space-y-3">
              {["Luxury Villas", "Apartments & Penthouses", "Land & Estates", "Commercial Property", "Duplex & Terraces", "Waterfront Homes"].map(item => (
                <li key={item}>
                  <Link href="/properties" className="flex items-center gap-2 text-sm transition-colors group" style={{ color: "rgba(167,243,208,0.6)" }}>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" style={{ color: "#16a34a" }} />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5 text-base">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} style={{ color: "#16a34a", marginTop: "2px", flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "rgba(167,243,208,0.6)" }}>15 Adeola Odeku Street<br />Victoria Island, Lagos</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} style={{ color: "#16a34a", flexShrink: 0 }} />
                <a href="tel:+2348056368084" className="text-sm transition-colors" style={{ color: "rgba(167,243,208,0.6)" }}>+234 805 636 8084</a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} style={{ color: "#16a34a", flexShrink: 0 }} />
                <a href="mailto:info@toppropretiesnigeria.com" className="text-sm transition-colors" style={{ color: "rgba(167,243,208,0.6)" }}>info@toppropretiesnigeria.com</a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#6ee7b7" }}>Office Hours</p>
              <p className="text-xs" style={{ color: "rgba(167,243,208,0.6)" }}>Mon–Fri: 8am – 6pm</p>
              <p className="text-xs" style={{ color: "rgba(167,243,208,0.6)" }}>Sat: 9am – 4pm</p>
            </div>
          </div>
        </div>
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs text-center md:text-left" style={{ color: "rgba(167,243,208,0.4)" }}>
            © {year} Top Properties Nigeria. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
              <Link key={item} href="#" className="text-xs transition-colors" style={{ color: "rgba(167,243,208,0.4)" }}>{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
