import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MetaPixel from "@/components/MetaPixel";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <MetaPixel />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}