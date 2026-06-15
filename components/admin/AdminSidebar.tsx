"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Building2, PlusCircle, LogOut, X, Menu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/properties", label: "All Properties", icon: Building2, exact: false },
  // { href: "/admin/properties/new", label: "Add Property", icon: PlusCircle, exact: false },
  
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r"
        style={{ background: "white", borderColor: "#e5e7eb", height: "100vh", position: "sticky", top: 0 }}>
        <SidebarContent
          pathname={pathname}
          setMobileOpen={setMobileOpen}
          isActive={isActive}
          handleLogout={handleLogout}
        />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b"
        style={{ background: "white", borderColor: "#e5e7eb", height: "60px" }}>
        <Link href="/admin" className="flex items-center gap-2 ">
           <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(22,163,74,0.15)" }}>
     
          <div className="relative h-14 w-14  rounded-md p-4">
            <Image
              src={"/logoblack.svg"}
              alt="Top Properties Nigeria Brand"
              fill
              className="object-fill transition-all duration-300 "
              priority
            />
          </div>
       
      </div>
          {/* <span className="font-display font-semibold text-sm" style={{ color: "#0A4D2E" }}>Admin</span> */}
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#374151" }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30" onClick={() => setMobileOpen(false)}
          style={{ background: "rgba(0,0,0,0.4)" }} />
      )}

      {/* Mobile drawer */}
      <div className="lg:hidden fixed top-0 left-0 bottom-0 z-40 w-64 transition-transform duration-300"
        style={{
          background: "white",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
        }}>
        <SidebarContent
          pathname={pathname}
          setMobileOpen={setMobileOpen}
          isActive={isActive}
          handleLogout={handleLogout}
        />
      </div>
    </>
  );
}

type SidebarProps = {
  pathname: string | null;
  setMobileOpen: (v: boolean) => void;
  isActive: (href: string, exact: boolean) => boolean;
  handleLogout: () => Promise<void>;
};

function SidebarContent({ pathname, setMobileOpen, isActive, handleLogout }: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(22,163,74,0.15)" }}>
        <Link href="/admin" className="flex items-center justify-center gap-3">
          <div className="relative h-14 w-14  rounded-md p-4">
            <Image
              src={"/logoblack.svg"}
              alt="Top Properties Nigeria Brand"
              fill
              className="object-fill transition-all duration-300 "
              priority
            />
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link key={href} href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: active ? "linear-gradient(135deg, #0A4D2E, #16a34a)" : "transparent",
                color: active ? "white" : "#374151",
              }}
            >
              <Icon size={18} style={{ opacity: active ? 1 : 0.6 }} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4">
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs transition-all mb-1"
          style={{ color: "#6b7280" }}>
          <Building2 size={16} />
          View Live Site
        </Link>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs transition-all"
          style={{ color: "#dc2626" }}>
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
