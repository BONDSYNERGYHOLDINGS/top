"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isTransparent = !scrolled && isHome;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isTransparent ? "transparent" : "rgba(255,255,255,0.97)",
        backdropFilter: isTransparent ? "none" : "blur(12px)",
        boxShadow: isTransparent ? "none" : "0 2px 20px rgba(10,77,46,0.08)",
        borderBottom: isTransparent ? "none" : "1px solid rgba(10,77,46,0.08)",
      }}
    >
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 md:h-20">
         
          {/* Logo */}
       
          <Link href="/" className="flex items-center gap-2 group">
  <div className="relative h-14 w-14  rounded-md p-4">
    <Image
      src={isTransparent ? "/logowhite.svg" : "/logoblack.svg"}
      alt="Naija Realty"
      fill
      className="object-fill transition-all duration-300 "
      priority
    />
  </div>
</Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? "#0A4D2E" : "transparent",
                    color: isActive ? "white" : isTransparent ? "white" : "#0A4D2E",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          {/* <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}
            >
              List Property
            </Link>
          </div> */}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: isTransparent ? "white" : "#0A4D2E" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: mobileOpen ? "400px" : "0", opacity: mobileOpen ? 1 : 0 }}
      >
        <div className="bg-white border-t px-4 py-4 space-y-1" style={{ borderColor: "rgba(10,77,46,0.1)" }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive ? "#0A4D2E" : "transparent",
                  color: isActive ? "white" : "#0A4D2E",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2" style={{ borderTop: "1px solid rgba(10,77,46,0.08)" }}>
            <Link
              href="/contact"
              className="block w-full text-center px-4 py-3 rounded-xl text-white text-sm font-semibold"
              style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
