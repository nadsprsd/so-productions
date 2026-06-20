"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlogPost() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", slug: "", category: "", excerpt: "", content: "", status: "draft", metaTitle: "", metaDescription: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/ +/g, "-");
  const inp = { width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.6rem", color: "var(--color-platinum)", fontSize: "0.875rem", outline: "none", fontFamily: "var(--font-body)" };
  const label = { display: "block" as const, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--color-gold-dim)", marginBottom: "0.5rem" };

  const handleSave = async () => {
    if (!form.title || !form.excerpt || !form.content || !form.category) {
      setError("Title, category, excerpt, and content are all required."); return;
    }
    setSaving(true); setError("");
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, slug: form.slug, category: form.category, excerpt: form.excerpt, content: form.content, status: form.status, seo: { metaTitle: form.metaTitle, metaDescription: form.metaDescription } }),
      });
      if (!res.ok) { const d = await res.json(); setError(d.error || "Save failed"); setSaving(false); return; }
      router.push("/admin/blog");
    } catch { setError("Network error. Try again."); setSaving(false); }
  };

  return (
    <div style={{ padding: "2.5rem", maxWidth: "900px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/blog" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-platinum-dim)", textDecoration: "none", fontSize: "0.82rem" }}><ArrowLeft size={15} /> Back</Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-platinum)", fontWeight: 300 }}>New <span style={{ color: "var(--color-gold)" }}>Blog Post</span></h1>
      </div>
      {error && <p style={{ color: "#e05050", marginBottom: "1rem", fontSize: "0.85rem", padding: "0.75rem 1rem", background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "0.6rem" }}>{error}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.75rem" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={label}>Post Title *</label>
              <input value={form.title} onChange={e => { set("title", e.target.value); set("slug", autoSlug(e.target.value)); }} style={{ ...inp, fontSize: "1.1rem" }} placeholder="e.g. How to Choose the Right PA System" />
            </div>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={label}>URL Slug *</label>
              <input value={form.slug} onChange={e => set("slug", e.target.value)} style={inp} placeholder="how-to-choose-pa-system" />
            </div>
            <div>
              <label style={label}>Excerpt (shown in blog list) *</label>
              <textarea value={form.excerpt} onChange={e => set("excerpt", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="A short description of what this post is about..." />
            </div>
          </div>
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.75rem" }}>
            <label style={label}>Content *</label>
            <textarea value={form.content} onChange={e => set("content", e.target.value)} rows={16} style={{ ...inp, resize: "vertical", lineHeight: 1.7 }} placeholder="Write your full blog post content here..." />
          </div>
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.75rem" }}>
            <p style={{ fontSize: "0.78rem", color: "var(--color-gold)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>SEO Settings</p>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={label}>Meta Title (max 60 chars)</label>
              <input value={form.metaTitle} onChange={e => set("metaTitle", e.target.value)} style={inp} placeholder="Leave blank to use post title" maxLength={60} />
              <p style={{ fontSize: "0.68rem", color: "var(--color-platinum-dim)", marginTop: "0.3rem" }}>{form.metaTitle.length}/60</p>
            </div>
            <div>
              <label style={label}>Meta Description (max 160 chars)</label>
              <textarea value={form.metaDescription} onChange={e => set("metaDescription", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Brief description for Google search results..." maxLength={160} />
              <p style={{ fontSize: "0.68rem", color: "var(--color-platinum-dim)", marginTop: "0.3rem" }}>{form.metaDescription.length}/160</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.5rem" }}>
            <p style={{ fontSize: "0.68rem", color: "var(--color-gold-dim)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1rem" }}>Publish</p>
            <div style={{ marginBottom: "1rem" }}>
              <label style={label}>Category *</label>
              <select value={form.category} onChange={e => set("category", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
                <option value="">Select category...</option>
                {["Education","Insight","Tips","Schools","Corporate","Behind the Scenes","News"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={label}>Status</label>
              <select value={form.status} onChange={e => set("status", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <button onClick={handleSave} disabled={saving} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.8rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", cursor: saving ? "not-allowed" : "pointer", fontSize: "0.78rem", fontWeight: 700, opacity: saving ? 0.7 : 1 }}>
              <Save size={14} /> {saving ? "Saving..." : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

