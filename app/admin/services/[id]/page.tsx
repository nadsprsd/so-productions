"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditServicePage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [form, setForm] = useState({ title: "", excerpt: "", description: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadService() {
      try {
        const res = await fetch(`/api/admin/services?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setForm({
            title: data.title || "",
            excerpt: data.excerpt || "",
            description: data.description || "",
            image: data.image || ""
          });
        }
      } catch (err) {
        console.error("Failed to map dynamic service structural route:", err);
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", id, ...form })
      });
      if (res.ok) {
        alert("Service configurations updated completely!");
        router.push("/admin/services");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Luxury obsidian-dark theme styling properties matching your screenshot
  const inp = { width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.6rem", color: "var(--color-platinum)", fontSize: "0.875rem", outline: "none", marginBottom: "1.25rem", fontFamily: "var(--font-body)" };
  const lbl = { display: "block", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--color-gold-dim)", marginBottom: "0.5rem" };

  if (loading) {
    return (
      <div style={{ padding: "2.5rem", display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-platinum-dim)" }}>
        <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Reading operational parameters...
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem", maxWidth: "900px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/services" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-platinum-dim)", textDecoration: "none", fontSize: "0.82rem" }}>
          <ArrowLeft size={15} /> Back
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-platinum)", fontWeight: 300 }}>
          Edit <span style={{ color: "var(--color-gold)" }}>Service Features</span>
        </h1>
      </div>

      <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.75rem" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={lbl}>Service Title *</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={{ ...inp, fontSize: "1.1rem", marginBottom: 0 }} required />
            </div>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={lbl}>Service Image URL Link</label>
              <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} style={{ ...inp, marginBottom: 0 }} placeholder="e.g. https://images.unsplash.com/photo-..." />
            </div>
            <div>
              <label style={lbl}>Short Summary Card Text *</label>
              <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={3} style={{ ...inp, resize: "vertical", marginBottom: 0 }} required />
            </div>
          </div>

          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.75rem" }}>
            <label style={lbl}>Detailed Full Page Description Text Block *</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={12} style={{ ...inp, resize: "vertical", lineHeight: 1.7, marginBottom: 0 }} required />
          </div>
        </div>

        <div>
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.5rem", position: "sticky", top: "2rem" }}>
            <p style={{ fontSize: "0.68rem", color: "var(--color-gold-dim)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1rem" }}>Actions</p>
            <button type="submit" disabled={saving} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.8rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", cursor: saving ? "not-allowed" : "pointer", fontSize: "0.78rem", fontWeight: 700, opacity: saving ? 0.7 : 1 }}>
              <Save size={14} /> {saving ? "Saving Changes..." : "Save Technical Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}