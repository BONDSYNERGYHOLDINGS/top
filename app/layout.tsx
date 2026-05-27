import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: {
    default: "Top Properties Nigeria – Nigeria's Premier Luxury Real Estate",
    template: "%s | Top Properties Nigeria",
  },
  description:
    "Discover premium properties for sale and rent across Lagos, Abuja, and Nigeria. Luxury homes, apartments, land and commercial real estate. Your dream property awaits.",
  keywords: [
    "real estate Nigeria",
    "luxury homes Lagos",
    "property for sale Abuja",
  ],
  openGraph: {
    title: "Top Properties Nigeria | Nigeria's Premier Properties",
    description: "Discover extraordinary properties across Nigeria.",
    type: "website",
    locale: "en_NG",
    siteName: "Top Properties Nigeria",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased ">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
