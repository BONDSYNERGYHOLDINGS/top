import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80" alt="Luxury home" fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,51,32,0.96), rgba(10,77,46,0.88), rgba(22,163,74,0.7))" }} />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }} />
          <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white uppercase mb-5"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#6ee7b7" }} />
                Ready to Begin?
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight mb-4">
                Your Dream Property
                <span className="block" style={{ background: "linear-gradient(135deg, #C9963A, #E0AE52)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Awaits You</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(167,243,208,0.8)" }}>
                Whether you&apos;re buying, selling, or investing — our team of expert agents is ready to guide you every step of the way.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/properties"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: "white", color: "#0A4D2E" }}>
                Browse Properties <ArrowRight size={16} />
              </Link>
              <Link href="https://wa.me/2347067882908?text=Hello, I'd like a free consultation." target="_blank"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-white font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: "#25D366" }}>
                <MessageCircle size={16} /> WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
