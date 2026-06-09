import AdminSidebar from "@/components/admin/AdminSidebar";
import PropertyForm, { PropertyFormData } from "@/components/admin/PropertyForm";
import { getAdminSession } from "@/lib/auth";
import { getPropertyById } from "@/lib/sheets";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: `Edit: ${id}` };
}

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params;

  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  let property = null;
  try {
    property = await getPropertyById(id);
  } catch {
    // sheets not configured yet — show empty form with id pre-filled
  }

  if (property === null && !property) {
    // If sheets is working but property not found
  }

  // Map SheetProperty → PropertyFormData
  const initialData: Partial<PropertyFormData> = property
    ? {
        id: property.id,
        title: property.title,
        price: property.price,
        priceRaw: property.priceRaw,
        location: property.location,
        state: property.state,
        shortDesc: property.shortDesc,
        fullDesc: property.fullDesc,
        type: property.type,
        status: property.status,
        bedrooms: property.bedrooms ?? "",
        bathrooms: property.bathrooms ?? "",
        area: property.area ?? "",
        yearBuilt: property.yearBuilt ?? "",
        features: property.features ?? [],
        images: property.images ?? [],
        featured: property.featured,
        agent: property.agent,
      }
    : { id };

  return (
    <div className="flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <main className="flex-1 lg:p-8 p-4 pt-20 lg:pt-8" style={{ background: "#f8fafc" }}>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <Link href="/admin/properties"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all hover:scale-105"
              style={{ background: "white", border: "1px solid #e5e7eb", color: "#374151" }}>
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="font-display font-bold text-xl md:text-2xl" style={{ color: "#0A4D2E" }}>
                Edit Property
              </h1>
              <p className="text-sm mt-0.5 font-mono" style={{ color: "#6b7280" }}>{id}</p>
            </div>
          </div>

          <Link href={`/properties/${id}`} target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{ background: "white", border: "1px solid #e5e7eb", color: "#374151" }}>
            <ExternalLink size={15} /> View Live
          </Link>
        </div>

        {!property && (
          <div className="mb-6 p-4 rounded-xl text-sm"
            style={{ background: "#fffbeb", border: "1px solid #fcd34d", color: "#92400e" }}>
            ⚠️ Unable to load properties, Please Refresh...
          </div>
        )}

        <PropertyForm mode="edit" propertyId={id} initialData={initialData} />
      </main>
    </div>
  );
}
