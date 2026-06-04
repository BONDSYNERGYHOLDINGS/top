import AdminSidebar from "@/components/admin/AdminSidebar";
import PropertyForm from "@/components/admin/PropertyForm";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Property" };

export default async function NewPropertyPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8" style={{ background: "#f8fafc" }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/properties"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all hover:scale-105"
            style={{ background: "white", border: "1px solid #e5e7eb", color: "#374151" }}>
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-display font-bold text-2xl" style={{ color: "#0A4D2E" }}>
              Add New Property
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
              New listing will be saved to Google Sheets instantly
            </p>
          </div>
        </div>

        <PropertyForm mode="create" />
      </main>
    </div>
  );
}
