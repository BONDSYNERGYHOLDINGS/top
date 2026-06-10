"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Save, X, Upload, Trash2, Plus,
  AlertCircle, CheckCircle2, Loader2,
  Video
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
  instagramUrl: string;
}

const EMPTY: PropertyFormData = {
  id: "", title: "", price: "", priceRaw: 0,
  location: "", state: "",
  shortDesc: "", fullDesc: "",
  type: "land", status: "for-sale",
  bedrooms: "", bathrooms: "", area: "", yearBuilt: "",
  features: [], images: [],
  featured: false,
  agent: { name: "Omotayo Dosunmu", phone: "+2347067882908", whatsapp: "2347067882908" },
  instagramUrl: "",
};

const STATES = [
  "Lagos","Abuja","Ogun State","Rivers State","Oyo State",
  "Kano","Enugu","Kaduna","Delta","Edo","Anambra","Other",
];

const MAX_IMAGES = 4;

interface Props {
  initialData?: Partial<PropertyFormData>;
  mode: "create" | "edit";
  propertyId?: string;
}

export default function PropertyForm({ initialData, mode, propertyId }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<PropertyFormData>({ ...EMPTY, ...initialData });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const set = (field: keyof PropertyFormData, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const setAgent = (field: keyof PropertyFormData["agent"], value: string) =>
    setForm(prev => ({ ...prev, agent: { ...prev.agent, [field]: value } }));

  const handleTitleChange = (val: string) => {
    set("title", val);
    if (mode === "create") {
      set("id", val.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-"));
    }
  };

  // const handlePriceChange = (val: string) => {
  //   set("price", val);
  //   const num = Number(val.replace(/[^0-9]/g, ""));
  //   if (!isNaN(num)) set("priceRaw", num);
  // };

  const handlePriceChange = (val: string) => {
  // If user clears the field entirely, reset
  if (!val || val === "₦") {
    set("price", "");
    set("priceRaw", 0);
    return;
  }

  // Allow special strings like "COMING SOON", "SALES CLOSED"
  const isSpecial = /[a-zA-Z]/.test(val);
  if (isSpecial) {
    set("price", val.toUpperCase());
    set("priceRaw", 0);
    return;
  }

  // Strip everything except digits
  const digits = val.replace(/[^0-9]/g, "");
  if (!digits) return;

  const num = Number(digits);
  // Format with commas: ₦4,500,000
  const formatted = "₦" + num.toLocaleString("en-NG");
  set("price", formatted);
  set("priceRaw", num);
};

  const addFeature = () => {
    const f = newFeature.trim();
    if (!f || form.features.includes(f)) return;
    set("features", [...form.features, f]);
    setNewFeature("");
  };

  const removeFeature = (idx: number) =>
    set("features", form.features.filter((_, i) => i !== idx));

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError("");

    const remaining = MAX_IMAGES - form.images.length;
    if (remaining <= 0) {
      setError(`Maximum ${MAX_IMAGES} images allowed. Remove one to add another.`);
      return;
    }

    const toUpload = Array.from(files).slice(0, remaining);
    if (Array.from(files).length > remaining) {
      setError(`Only ${remaining} more image${remaining !== 1 ? "s" : ""} allowed. Uploading first ${remaining}.`);
    }

    setUploading(true);
    setUploadProgress(0);
    const uploaded: string[] = [];

    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i];
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is too large (max 5MB)`);
        continue;
      }
      const fd = new FormData();
      fd.append("file", file);
      fd.append("propertyId", form.id || "new-property");
      try {
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        uploaded.push(data.url);
      } catch (e: any) {
        setError(e.message);
      }
      setUploadProgress(Math.round(((i + 1) / toUpload.length) * 100));
    }

    if (uploaded.length > 0) set("images", [...form.images, ...uploaded]);
    setUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (idx: number) =>
    set("images", form.images.filter((_, i) => i !== idx));

  const moveImage = (from: number, to: number) => {
    const imgs = [...form.images];
    const [item] = imgs.splice(from, 1);
    imgs.splice(to, 0, item);
    set("images", imgs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.title.trim()) { setError("Property title is required"); return; }
    if (!form.location.trim()) { setError("Location is required"); return; }
    if (!form.state) { setError("Please select a state"); return; }
    if (form.images.length === 0) { setError("Please upload at least one image"); return; }

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
      if (!res.ok) throw new Error(data.error ?? "Failed to save");
      setSuccess(mode === "create" ? "Property published successfully!" : "Changes saved!");
      setTimeout(() => router.push("/admin/properties"), 1500);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all";
  const inputStyle = { border: "1px solid #e5e7eb", color: "#111827", background: "white" };
  const focusStyle = {
    onFocus: (e: any) => (e.target.style.borderColor = "#0A4D2E"),
    onBlur:  (e: any) => (e.target.style.borderColor = "#e5e7eb"),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl text-sm"
          style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626" }}>
          <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-start gap-3 p-4 rounded-xl text-sm"
          style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
          <CheckCircle2 size={16} className="shrink-0 mt-0.5" /> {success}
        </div>
      )}

      {/* Photos */}
      <Card title="Property Photos">
        <div
          onClick={() => !uploading && form.images.length < MAX_IMAGES && fileInputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); handleImageUpload(e.dataTransfer.files); }}
          className="border-2 border-dashed rounded-xl p-6 text-center transition-all"
          style={{
            borderColor: form.images.length >= MAX_IMAGES ? "#e5e7eb" : "#bbf7d0",
            background: form.images.length >= MAX_IMAGES ? "#fafafa" : "#f0fdf4",
            cursor: form.images.length >= MAX_IMAGES ? "not-allowed" : "pointer",
            opacity: form.images.length >= MAX_IMAGES ? 0.6 : 1,
          }}
        >
          <input ref={fileInputRef} type="file" className="hidden"
            accept="image/*" multiple
            onChange={e => handleImageUpload(e.target.files)}
            disabled={form.images.length >= MAX_IMAGES} />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={28} className="animate-spin" style={{ color: "#16a34a" }} />
              <p className="text-sm font-medium" style={{ color: "#0A4D2E" }}>
                Uploading... {uploadProgress}%
              </p>
              <div className="w-48 h-1.5 rounded-full overflow-hidden" style={{ background: "#dcfce7" }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${uploadProgress}%`, background: "#16a34a" }} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: "#dcfce7" }}>
                <Upload size={22} style={{ color: "#0A4D2E" }} />
              </div>
              <p className="text-sm font-medium" style={{ color: "#0A4D2E" }}>
                {form.images.length >= MAX_IMAGES ? `Maximum ${MAX_IMAGES} photos reached` : "Click or drag photos here"}
              </p>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                Select up to {MAX_IMAGES - form.images.length} photo{MAX_IMAGES - form.images.length !== 1 ? "s" : ""} at once · Max 5MB each · JPG, PNG, WEBP
              </p>
              <div className="flex gap-1 mt-1">
                {[...Array(MAX_IMAGES)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full"
                    style={{ background: i < form.images.length ? "#16a34a" : "#d1fae5" }} />
                ))}
              </div>
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                {form.images.length}/{MAX_IMAGES} photos added
              </p>
            </div>
          )}
        </div>

        {form.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {form.images.map((url, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden"
                style={{ aspectRatio: "4/3", background: "#f3f4f6" }}>
                <img src={url} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.5)" }}>
                  <div className="flex gap-1.5">
                    {i > 0 && (
                      <button type="button" onClick={() => moveImage(i, i - 1)}
                        className="px-2 py-1 rounded-lg text-white text-xs font-bold"
                        style={{ background: "rgba(255,255,255,0.2)" }}>←</button>
                    )}
                    {i < form.images.length - 1 && (
                      <button type="button" onClick={() => moveImage(i, i + 1)}
                        className="px-2 py-1 rounded-lg text-white text-xs font-bold"
                        style={{ background: "rgba(255,255,255,0.2)" }}>→</button>
                    )}
                    <button type="button" onClick={() => removeImage(i)}
                      className="p-1.5 rounded-lg" style={{ background: "#dc2626" }}>
                      <Trash2 size={13} className="text-white" />
                    </button>
                  </div>
                </div>
                {i === 0 && (
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                    style={{ background: "#0A4D2E" }}>Cover</div>
                )}
                <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "rgba(0,0,0,0.5)" }}>{i + 1}</div>
              </div>
            ))}
            {[...Array(MAX_IMAGES - form.images.length)].map((_, i) => (
              <div key={i} onClick={() => fileInputRef.current?.click()}
                className="rounded-xl flex items-center justify-center cursor-pointer transition-all hover:opacity-80"
                style={{ aspectRatio: "4/3", background: "#f9fafb", border: "2px dashed #e5e7eb" }}>
                <Plus size={20} style={{ color: "#d1d5db" }} />
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Property Details */}
      <Card title="Property Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Property Title *</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.title} onChange={e => handleTitleChange(e.target.value)}
              placeholder="e.g. Oakville Green Estate" required />
          </div>
          <div>
            <Label>Price *</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.price} onChange={e => handlePriceChange(e.target.value)}
              placeholder="Type amount e.g. 4500000 or COMING SOON" required />
               <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
    ₦ sign and commas are added automatically
  </p>
          </div>
          <div>
            <Label>Type *</Label>
            <select className={inputCls} style={inputStyle} {...focusStyle}
              value={form.type} onChange={e => set("type", e.target.value as any)} required>
              <option value="land">Land</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <Label>Location *</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.location} onChange={e => set("location", e.target.value)}
              placeholder="e.g. Lekki Phase 1, Lagos" required />
          </div>
          <div>
            <Label>State *</Label>
            <select className={inputCls} style={inputStyle} {...focusStyle}
              value={form.state} onChange={e => set("state", e.target.value)} required>
              <option value="">Select state...</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <Label>Status *</Label>
            <select className={inputCls} style={inputStyle} {...focusStyle}
              value={form.status} onChange={e => set("status", e.target.value as any)} required>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
              <option value="sold">Sold / Closed</option>
            </select>
          </div>
          <div>
            <Label>Plot / Area Size</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.area} onChange={e => set("area", e.target.value)}
              placeholder="e.g. 300sqm - 500sqm" />
          </div>
          <div>
            <Label>Bedrooms</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.bedrooms} onChange={e => set("bedrooms", e.target.value)}
              placeholder="e.g. 3 or 2,3" />
          </div>
          <div>
            <Label>Bathrooms</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.bathrooms} onChange={e => set("bathrooms", e.target.value)}
              placeholder="e.g. 2" />
          </div>
          <div>
            <Label>Year Built</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.yearBuilt} onChange={e => set("yearBuilt", e.target.value)}
              placeholder="e.g. 2023" />
          </div>
          <div className="md:col-span-2 flex items-center gap-3 py-1">
            <button type="button" onClick={() => set("featured", !form.featured)}
              className="w-12 h-6 rounded-full transition-all relative shrink-0"
              style={{ background: form.featured ? "#16a34a" : "#d1d5db" }}>
              <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm transition-all"
                style={{ left: form.featured ? "calc(100% - 22px)" : "2px" }} />
            </button>
            <div>
              <p className="text-sm font-medium" style={{ color: "#374151" }}>Feature this property</p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>Featured properties appear on the homepage</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Description */}
      <Card title="Description">
        <div className="space-y-4">
          <div>
            <Label>Short Summary *</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.shortDesc} onChange={e => set("shortDesc", e.target.value)}
              placeholder="One sentence that appears on the property card" required />
          </div>
          <div>
            <Label>Full Description *</Label>
            <textarea rows={5} className={inputCls} style={{ ...inputStyle, resize: "vertical" }}
              {...focusStyle} value={form.fullDesc} onChange={e => set("fullDesc", e.target.value)}
              placeholder="Describe the property in detail — location benefits, design, nearby amenities..." required />
          </div>
        </div>
      </Card>

      {/* Features */}
      <Card title="Features & Amenities">
        <div className="flex gap-2 mb-3">
          <input className={inputCls} style={inputStyle} {...focusStyle}
            value={newFeature} onChange={e => setNewFeature(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
            placeholder="e.g. Swimming Pool, 24hr Security, Solar Power..." />
          <button type="button" onClick={addFeature}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-white shrink-0 hover:scale-105 transition-all"
            style={{ background: "#0A4D2E" }}>
            <Plus size={18} />
          </button>
        </div>
        {form.features.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {form.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
                {f}
                <button type="button" onClick={() => removeFeature(i)} className="hover:opacity-70">
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            Type a feature above and press Enter or click +
          </p>
        )}
      </Card>

      {/* Agent */}
      <Card title="Agent Contact">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Agent Name</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.agent.name} onChange={e => setAgent("name", e.target.value)} />
          </div>

          <div>
            <Label>Phone</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.agent.phone} onChange={e => setAgent("phone", e.target.value)}
              placeholder="+2347067882908" />
          </div>

          <div>
            <Label>WhatsApp Number</Label>
            <input className={inputCls} style={inputStyle} {...focusStyle}
              value={form.agent.whatsapp} onChange={e => setAgent("whatsapp", e.target.value)}
              placeholder="2347067882908 (no +)" />
          </div>

          <div className="md:col-span-3">
      <Label>Instagram URL (optional)</Label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}>
          <Video size={11} className="text-white" />
        </div>
        <input className={inputCls} style={{ ...inputStyle, paddingLeft: "2.75rem" }} {...focusStyle}
          value={form.instagramUrl} onChange={e => set("instagramUrl", e.target.value)}
          placeholder="https://www.instagram.com/p/your-post-id/" />
      </div>
      <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
        Link to an Instagram video showing this property. Visitors can tap to view videos.
      </p>
    </div>
  

        </div>
      </Card>

      {/* Submit */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button type="button" onClick={() => router.push("/admin/properties")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
          style={{ background: "white", border: "1px solid #e5e7eb", color: "#374151" }}>
          <X size={15} /> Cancel
        </button>
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg disabled:opacity-60"
          style={{ background: "linear-gradient(to right, #0A4D2E, #16a34a)" }}>
          {saving
            ? <><Loader2 size={15} className="animate-spin" /> Saving...</>
            : <><Save size={15} /> {mode === "create" ? "Publish Property" : "Save Changes"}</>}
        </button>
      </div>
    </form>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
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

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
      style={{ color: "#6b7280" }}>
      {children}
    </label>
  );
}