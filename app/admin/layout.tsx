import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin Portal", template: "%s | Naija Realty Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", background: "#f8fafc" }}>
      {children}
    </div>
  );
}
