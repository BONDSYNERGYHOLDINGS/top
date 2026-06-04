"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Save, X, Upload, Trash2, Plus, AlertCircle,
  CheckCircle2, Image as ImageIcon, Loader2, GripVertical
} from "lucide-react";

export interface PropertyFormData {
  id: string;
  title: string;
  price: string;
  priceRaw: number;
  location: string;
  state: string;
  shortDesc: string;
  fullDesc: string;
  type: "house" | "apartment" | "land" | "commercial";
  status: "for-sale" | "for-rent" | "sold";
  bedrooms: string;
  bathrooms: string;
  area: string;
  yearBuilt: string;
  features: string[];
  images: string[];
  featured: boolean;
  agent: { name: string; phone: string; whatsapp: string };
}

const EMPTY_FORM: PropertyFormData = {
  id: "", title: "", price: "", priceRaw: 0,
  location: "", state: "",
  shortDesc: "", fullDesc: "",
  type: "land", status: "for-sale",
  bedrooms: "", bathrooms: "", area: "", yearBuilt: "",
  features: [], images: [],
  featured: false,
  agent: { name: "Omotayo Dosunmu", phone: "+2347067882908", whatsapp: "2347067882908" },
};

const STATES = [
  "Lagos","Abuja","Ogun State","Rivers State","Oyo State",
  "Kano","Enugu","Kaduna","Delta","Edo","Anambra","Other",
];

interface Props {
  initialData?: Partial<PropertyFormData>;
  mode: "create" | "edit";
  propertyId?: string;
}

export default function PropertyForm({ initialData, mode, propertyId }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<PropertyFormData>({ ...EMPTY_FORM, ...initialData });
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newFeature, setNewFeature] = useState("");

  // ── Field helpers ──────────────────────────────────────────────────────────
  const set = (field: keyof PropertyFormData, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const setAgent = (field: keyof PropertyFormData["agent"], value: string) =>
    setForm(prev => ({ ...prev, agent: { ...prev.agent, [field]: value } }));

  // Auto-generate id from title (create mode only)
  const handleTitleChange = (val: string) => {
    set("title", val);
    if (mode === "create") {
      set("id", val.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"));
    }
  };

  // Auto-sync priceRaw from price string
  const handlePriceChange = (val: string) => {
    set("price", val);
    const num = Number(val.replace(/[^0-9]/g, ""));
    if (!isNaN(num)) set("priceRaw", num);
  };

  // ── Features ───────────────────────────────────────────────────────────────
  const addFeature = () => {
    const f = newFeature.trim();
    if (!f || form.features.includes(f)) return;
    set("features", [...form.features, f]);
    setNewFeature("");
  };

  const removeFeature = (idx: number) =>
    set("features", form.features.filter((_, i) => i !== idx));

  // ── Image upload ───────────────────────────────────────────────────────────
  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError("");

    for (const file of Array.from(files)) {
      const tempIdx = form.images.length; // placeholder index
      setUploadingIdx(tempIdx);

      const fd = new FormData();
      fd.append("file", file);
      fd.append("propertyId", form.id || "new-property");

      try {
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        set("images", [...form.images, data.url]);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setUploadingIdx(null);
      }
    }
  };

  const removeImage = (idx: number) =>
    set("images", form.images.filter((_, i) => i !== idx));

  const moveImage = (from: number, to: number) => {
    const imgs = [...form.images];
    const [item] = imgs.splice(from, 1);
    imgs.splice(to, 0, item);
    set("images", imgs);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.location.trim()) { setError("Location is required"); return; }
    if (form.images.length === 0) { setError("At least one image is required"); return; }

    setSaving(true);

    const url = mode === "create" ? "/api/properties" : `/api/properties/${propertyId}`;
    const method = mode === "create" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      setSuccess(mode === "create" ? "Property created successfully!" : "Property updated successfully!");
      setTimeout(() => router.push("/admin/properties"), 1500);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Shared input styles ────────────────────────────────────────────────────
  const inputCls = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
  const inputStyle = { border: "1px solid #e5e7eb", color: "#111827", background: "white" };
  const labelCls = "block text-xs font-semibold uppercase tracking-wide mb-1.5";
  const labelStyle = { color: "#6b7280" };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Alerts */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl text-sm"
          style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
          <AlertCircle size={16} className="shrink-0 mt-0.5" />{error}
        </div>
      )}
      {success && (
        <div className="flex items-start gap-3 p-4 rounded-xl text-sm"
          style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
          <CheckCircle2 size={16} className="shrink-0 mt-0.5" />{success}
        </div>
      )}

      {/* ── Section: Basic Info ── */}
      <Section title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelCls} style={labelStyle}>Property Title *</label>
            <input className={inputCls} style={inputStyle} value={form.title}
              onChange={e => handleTitleChange(e.target.value)} placeholder="e.g. Oakville Green Estate" required />
          </div>

          {mode === "create" && (
            <div className="md:col-span-2">
              <label className={labelCls} style={labelStyle}>URL Slug (auto-generated)</label>
              <input className={inputCls} style={{ ...inputStyle, background: "#f9fafb" }}
                value={form.id} onChange={e => set("id", e.target.value)}
                placeholder="oakville-green-estate" />
              <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>Used in property URL: /properties/<strong>{form.id || "slug"}</strong></p>
            </div>
          )}

          <div>
            <label className={labelCls} style={labelStyle}>Price Display *</label>
            <input className={inputCls} style={inputStyle} value={form.price}
              onChange={e => handlePriceChange(e.target.value)}
              placeholder="₦4,500,000 or COMING SOON" required />
          </div>

          <div>
            <label className={labelCls} style={labelStyle}>Price (numeric)</label>
            <input type="number" className={inputCls} style={inputStyle} value={form.priceRaw || ""}
              onChange={e => set("priceRaw", Number(e.target.value))} placeholder="4500000" />
          </div>

          <div>
            <label className={labelCls} style={labelStyle}>Location *</label>
            <input className={inputCls} style={inputStyle} value={form.location}
              onChange={e => set("location", e.target.value)}
              placeholder="Mowe-Ofada, Ogun State" required />
          </div>

          <div>
            <label className={labelCls} style={labelStyle}>State *</label>
            <select className={inputCls} style={inputStyle} value={form.state}
              onChange={e => set("state", e.target.value)} required>
              <option value="">Select state...</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </Section>

      {/* ── Section: Classification ── */}
      <Section title="Classification">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className={labelCls} style={labelStyle}>Type *</label>
            <select className={inputCls} style={inputStyle} value={form.type}
              onChange={e => set("type", e.target.value as any)} required>
              <option value="land">Land</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className={labelCls} style={labelStyle}>Status *</label>
            <select className={inputCls} style={inputStyle} value={form.status}
              onChange={e => set("status", e.target.value as any)} required>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
              <option value="sold">Sold / Closed</option>
            </select>
          </div>

          <div>
            <label className={labelCls} style={labelStyle}>Bedrooms</label>
            <input className={inputCls} style={inputStyle} value={form.bedrooms}
              onChange={e => set("bedrooms", e.target.value)} placeholder="3 or 2,3" />
          </div>

          <div>
            <label className={labelCls} style={labelStyle}>Bathrooms</label>
            <input className={inputCls} style={inputStyle} value={form.bathrooms}
              onChange={e => set("bathrooms", e.target.value)} placeholder="2" />
          </div>

          <div>
            <label className={labelCls} style={labelStyle}>Area / Plot Size</label>
            <input className={inputCls} style={inputStyle} value={form.area}
              onChange={e => set("area", e.target.value)} placeholder="300 - 500 sqm" />
          </div>

          <div>
            <label className={labelCls} style={labelStyle}>Year Built</label>
            <input className={inputCls} style={inputStyle} value={form.yearBuilt}
              onChange={e => set("yearBuilt", e.target.value)} placeholder="2023" />
          </div>

          <div className="col-span-2 flex items-center gap-3 pt-2">
            <button type="button"
              onClick={() => set("featured", !form.featured)}
              className="w-12 h-6 rounded-full transition-all relative"
              style={{ background: form.featured ? "#16a34a" : "#d1d5db" }}>
              <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm"
                style={{ left: form.featured ? "calc(100% - 22px)" : "2px" }} />
            </button>
            <label className="text-sm font-medium" style={{ color: "#374151" }}>
              Featured Property
            </label>
          </div>
        </div>
      </Section>

      {/* ── Section: Descriptions ── */}
      <Section title="Descriptions">
        <div className="space-y-4">
          <div>
            <label className={labelCls} style={labelStyle}>Short Description *</label>
            <input className={inputCls} style={inputStyle} value={form.shortDesc}
              onChange={e => set("shortDesc", e.target.value)}
              placeholder="One-line summary shown on property cards" required />
            <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>{form.shortDesc.length}/120 chars recommended</p>
          </div>

          <div>
            <label className={labelCls} style={labelStyle}>Full Description *</label>
            <textarea rows={6} className={inputCls} style={{ ...inputStyle, resize: "vertical" }}
              value={form.fullDesc} onChange={e => set("fullDesc", e.target.value)}
              placeholder="Detailed property description shown on the property detail page..." required />
          </div>
        </div>
      </Section>

      {/* ── Section: Features ── */}
      <Section title="Features & Amenities">
        <div className="flex gap-2 mb-3">
          <input className={inputCls} style={inputStyle} value={newFeature}
            onChange={e => setNewFeature(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
            placeholder="e.g. Swimming Pool, 24hr Security..." />
          <button type="button" onClick={addFeature}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-white shrink-0 hover:scale-105 transition-all"
            style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
            <Plus size={18} />
          </button>
        </div>

        {form.features.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {form.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
                {f}
                <button type="button" onClick={() => removeFeature(i)}
                  className="hover:opacity-70 transition-opacity">
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}

        {form.features.length === 0 && (
          <p className="text-xs" style={{ color: "#9ca3af" }}>No features added yet. Type above and press Enter or click +.</p>
        )}
      </Section>

      {/* ── Section: Images ── */}
      <Section title="Property Images">
        {/* Upload area */}
        <div
          className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all hover:border-green-400 mb-4"
          style={{ borderColor: "#d1fae5", background: "#f0fdf4" }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); handleImageUpload(e.dataTransfer.files); }}
        >
          <input ref={fileInputRef} type="file" className="hidden"
            accept="image/*" multiple
            onChange={e => handleImageUpload(e.target.files)} />
          {uploadingIdx !== null ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={28} className="animate-spin" style={{ color: "#16a34a" }} />
              <p className="text-sm" style={{ color: "#16a34a" }}>Uploading to Cloudinary...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={28} style={{ color: "#16a34a" }} />
              <p className="text-sm font-medium" style={{ color: "#0A4D2E" }}>
                Drop images here or click to upload
              </p>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                PNG, JPG, WEBP — max 5MB each. First image = cover photo.
              </p>
            </div>
          )}
        </div>

        {/* Image grid */}
        {form.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {form.images.map((url, i) => (
              <div key={url + i} className="relative group rounded-xl overflow-hidden"
                style={{ aspectRatio: "4/3", background: "#f3f4f6" }}>
                <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.55)" }}>
                  <div className="flex gap-2">
                    {i > 0 && (
                      <button type="button" onClick={() => moveImage(i, i - 1)}
                        className="p-1.5 rounded-lg text-white text-xs font-bold"
                        style={{ background: "rgba(255,255,255,0.2)" }}>←</button>
                    )}
                    {i < form.images.length - 1 && (
                      <button type="button" onClick={() => moveImage(i, i + 1)}
                        className="p-1.5 rounded-lg text-white text-xs font-bold"
                        style={{ background: "rgba(255,255,255,0.2)" }}>→</button>
                    )}
                    <button type="button" onClick={() => removeImage(i)}
                      className="p-1.5 rounded-lg"
                      style={{ background: "#dc2626" }}>
                      <Trash2 size={14} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Cover badge */}
                {i === 0 && (
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                    style={{ background: "#0A4D2E" }}>Cover</div>
                )}

                {/* Index */}
                <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "rgba(0,0,0,0.5)" }}>{i + 1}</div>
              </div>
            ))}
          </div>
        )}

        {/* Manual URL input */}
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #f3f4f6" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#6b7280" }}>OR paste a Cloudinary/image URL directly:</p>
          <div className="flex gap-2">
            <input id="manual-url" className={inputCls} style={inputStyle}
              placeholder="https://res.cloudinary.com/..." />
            <button type="button"
              onClick={() => {
                const el = document.getElementById("manual-url") as HTMLInputElement;
                if (el?.value.trim()) { set("images", [...form.images, el.value.trim()]); el.value = ""; }
              }}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-white shrink-0 hover:scale-105 transition-all"
              style={{ background: "#0A4D2E" }}>
              Add URL
            </button>
          </div>
        </div>
      </Section>

      {/* ── Section: Agent ── */}
      <Section title="Agent Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelCls} style={labelStyle}>Agent Name</label>
            <input className={inputCls} style={inputStyle} value={form.agent.name}
              onChange={e => setAgent("name", e.target.value)} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Phone</label>
            <input className={inputCls} style={inputStyle} value={form.agent.phone}
              onChange={e => setAgent("phone", e.target.value)} placeholder="+2347067882908" />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>WhatsApp Number (no +)</label>
            <input className={inputCls} style={inputStyle} value={form.agent.whatsapp}
              onChange={e => setAgent("whatsapp", e.target.value)} placeholder="2347067882908" />
          </div>
        </div>
      </Section>

      {/* ── Submit ── */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button type="button" onClick={() => router.push("/admin/properties")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
          style={{ background: "white", border: "1px solid #e5e7eb", color: "#374151" }}>
          <X size={16} /> Cancel
        </button>

        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg disabled:opacity-60"
          style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
          {saving
            ? <><Loader2 size={16} className="animate-spin" /> Saving...</>
            : <><Save size={16} /> {mode === "create" ? "Create Property" : "Save Changes"}</>}
        </button>
      </div>
    </form>
  );
}

// ── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
      <h3 className="font-semibold text-sm mb-5 pb-3"
        style={{ color: "#0A4D2E", borderBottom: "1px solid #f0fdf4" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}
