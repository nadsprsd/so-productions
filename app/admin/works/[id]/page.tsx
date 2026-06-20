"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditCaseStudy({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [form, setForm] = useState({
    title: "", category: "", location: "", date: "", tags: "", challenge: "", solution: "", result: "", image: "", id: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/admin/works?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setForm({
            title: data.title || "",
            category: data.category || data.type || "",
            location: data.location || "",
            date: data.date || "",
            tags: Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || ""),
            challenge: data.challenge || data.description || "",
            solution: data.solution || "",
            result: data.result || "",
            image: data.image || "",
            id: data.id || data._id || id
          });
        }
      } catch (err) {
        console.error("Error reading portfolio metrics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "update", 
          id: form.id, // Keeps the original reference locked 
          ...form,
          tags: form.tags.split(",").map(t => t.trim()).filter(Boolean)
        })
      });
      if (res.ok) {
        alert("Case study updated successfully!");
        router.push("/admin/works");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const inp = { width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.6rem", color: "var(--color-platinum)", fontSize: "0.875rem", outline: "none", marginBottom: "1.25rem" };
  const lbl = { display: "block", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--color-gold-dim)", marginBottom: "0.5rem" };

  if (loading) return <div style={{ padding: "2.5rem", color: "var(--color-platinum-dim)" }}>Loading workspace profile...</div>;

  return (
    <div style={{ padding: "2.5rem", maxWidth: "1100px" }}>
      <Link href="/admin/works" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--color-platinum-dim)", textDecoration: "none", fontSize: "0.82rem", marginBottom: "1.5rem" }}>
        <ArrowLeft size={15} /> Back to List Index
      </Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-platinum)", fontWeight: 300, marginBottom: "2rem" }}>
        Edit Case Study: <span style={{ color: "var(--color-gold)" }}>{form.title || "New Selection"}</span>
      </h1>

      <form onSubmit={handleSave}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div><label style={lbl}>Project Title</label><input value={form.title} onChange={e => setForm(f=>({...f, title: e.target.value}))} style={inp} required /></div>
          <div><label style={lbl}>Category / Type</label><input value={form.category} onChange={e => setForm(f=>({...f, category: e.target.value}))} style={inp} required /></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div><label style={lbl}>Location Context</label><input value={form.location} onChange={e => setForm(f=>({...f, location: e.target.value}))} style={inp} /></div>
          <div><label style={lbl}>Execution Date</label><input value={form.date} onChange={e => setForm(f=>({...f, date: e.target.value}))} style={inp} /></div>
        </div>

        <label style={lbl}>SEO Technical Badges / Tags (Comma Separated)</label>
        <input value={form.tags} onChange={e => setForm(f=>({...f, tags: e.target.value}))} style={inp} />

        <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.75rem", marginBottom: "2rem" }}>
          <p style={lbl}>Project Feature Image</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 250px", gap: "1.5rem", alignItems: "center" }}>
            <div>
              <label style={{ ...lbl, color: "var(--color-platinum-dim)", fontSize: "0.6rem" }}>Paste Image URL</label>
              <input value={form.image} onChange={e => setForm(f=>({...f, image: e.target.value}))} style={{ ...inp, marginBottom: "1rem" }} placeholder="https://..." />
              <div>
                <label htmlFor="file-upload" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "0.5rem", color: "var(--color-gold)", cursor: "pointer", fontSize: "0.8rem" }}>
                  <Upload size={14} /> Upload from Computer
                </label>
                <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
              </div>
            </div>
            <div style={{ width: "100%", height: "140px", background: "rgba(0,0,0,0.2)", border: "1px dashed rgba(201,168,76,0.15)", borderRadius: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              {form.image ? (
                <img src={form.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ textAlign: "center", color: "var(--color-platinum-dim)", fontSize: "0.75rem" }}><ImageIcon size={24} style={{ marginBottom: "0.25rem", opacity: 0.4 }} /><p>No Image</p></div>
              )}
            </div>
          </div>
        </div>

        <label style={lbl}>The Challenge</label>
        <textarea value={form.challenge} onChange={e => setForm(f=>({...f, challenge: e.target.value}))} rows={4} style={{...inp, resize: "vertical"}} />

        <label style={lbl}>Our Technical Solution</label>
        <textarea value={form.solution} onChange={e => setForm(f=>({...f, solution: e.target.value}))} rows={4} style={{...inp, resize: "vertical"}} />

        <label style={lbl}>The Result</label>
        <textarea value={form.result} onChange={e => setForm(f=>({...f, result: e.target.value}))} rows={4} style={{...inp, resize: "vertical"}} />

        <button type="submit" disabled={saving} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={16} />} Save Production Changes
        </button>
      </form>
    </div>
  );
}