"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const whatsappMsg = encodeURIComponent(`Hello, I am interested in your properties and would like more information. My name is ${form.name || "a potential client"}.`);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative pt-28 pb-16 overflow-hidden" style={{ background: "linear-gradient(135deg, #052e16 0%, #0A4D2E 60%, #166534 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Get In Touch
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Contact Our Team
          </h1>
          <p className="text-emerald-200 text-base max-w-xl mx-auto" style={{ opacity: 0.8 }}>
            Ready to find your dream property? Our expert agents are standing by to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-display font-bold text-2xl text-forest mb-2">Let&apos;s Talk</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Whether you are buying, selling, or investing — our team is here to guide you. Reach out via any channel.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  { Icon: MapPin, title: "Visit Us", content: "15 Adeola Odeku Street\nVictoria Island, Lagos" },
                  { Icon: Phone, title: "Call Us", content: "+234 805 636 8084\n+234 817 008 2610" },
                  { Icon: Mail, title: "Email Us", content: "info@toppropretiesnigeria.com\nsales@toppropretiesnigeria.com" },
                  { Icon: Clock, title: "Working Hours", content: "Mon–Fri: 8:00am – 6:00pm\nSat: 9:00am – 4:00pm" },
                ].map(({ Icon, title, content }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-forest" />
                    </div>
                    <div>
                      <p className="text-forest font-semibold text-sm mb-0.5">{title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed whitespace-pre-line">{content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/2348056368084?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full p-4 rounded-2xl bg-gradient-to-r from-[#075E54] to-[#25D366] text-white hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-white/70 text-xs">Typically replies within minutes</p>
                </div>
              </a>

              {/* Map placeholder */}
              <div className="mt-6 relative h-40 rounded-2xl overflow-hidden bg-emerald-50">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
                  alt="Lagos map"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                    <MapPin size={14} className="text-forest" />
                    <span className="text-forest font-medium text-xs">Victoria Island, Lagos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-100 rounded-3xl shadow-luxury p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-forest" />
                    </div>
                    <h3 className="font-display font-bold text-forest text-2xl mb-2">Message Sent!</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Thank you for reaching out. Our team will contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="px-6 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display font-bold text-forest text-xl mb-6">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-forest focus:ring-2 focus:ring-emerald-100 transition-all placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-forest focus:ring-2 focus:ring-emerald-100 transition-all placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+234 800 000 0000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-forest focus:ring-2 focus:ring-emerald-100 transition-all placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Enquiry Type</label>
                          <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-forest focus:ring-2 focus:ring-emerald-100 transition-all"
                          >
                            <option value="">Select type...</option>
                            <option>Buy a Property</option>
                            <option>Sell a Property</option>
                            <option>Property Investment</option>
                            <option>List My Property</option>
                            <option>General Enquiry</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1.5">Your Message *</label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Tell us about the type of property you are looking for, your budget, preferred location, and any other requirements..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 outline-none focus:border-forest focus:ring-2 focus:ring-emerald-100 transition-all placeholder-gray-400 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-forest to-green-mid text-white font-semibold text-sm hover:shadow-lg transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
