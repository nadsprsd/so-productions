"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewWork() {
  const router = useRouter();
  const [form, setForm] = useState({ 
    title: "", 
    client: "", 
    location: "", 
    eventType: "", 
    date: "", 
    description: "", 
    challenge: "", 
    solution: "", 
    result: "", 
    status: "draft",
    image: "" // Added image tracking inside state configuration
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  // 🛠️ Handle local file uploads from your computer browser instantly
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      set("image", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.description) {
      setError("Project Title, Location, and Project Overview are required fields.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      // POST the payload record over to our unified backend JSON file storage API
      const res = await fetch("/api/admin/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          id: "work_" + Date.now().toString(), // unique identification slug
          type: form.eventType, // maps category naming structures securely
        })
      });

      if (res.ok) {
        router.push("/admin/works");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to preserve project changes.");
        setSaving(false);
      }
    } catch (err) {
      setError("Network runtime exception during tracking save.");
      setSaving(false);
    }
  };

  const inp = { width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.6rem", color: "var(--color-platinum)", fontSize: "0.875rem", outline: "none", fontFamily: "var(--font-body)" };
  const lbl = { display: "block" as const, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--color-gold-dim)", marginBottom: "0.5rem" };

  return (
    <div style={{ padding: "2.5rem", maxWidth: "1100px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link href="/admin/works" style={{ color: "var(--color-platinum-dim)", textDecoration: "none", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" }}><ArrowLeft size={15} /> Back</Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-platinum)", fontWeight: 300 }}>New <span style={{ color: "var(--color-gold)" }}>Project</span></h1>
      </div>

      {error && <p style={{ color: "#e05050", marginBottom: "1rem", fontSize: "0.85rem", padding: "0.75rem 1rem", background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "0.6rem" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div><label style={lbl}>Project Title *</label><input value={form.title} onChange={e => set("title", e.target.value)} style={inp} placeholder="e.g. Jazz Festival Sound Production" required /></div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div><label style={lbl}>Client / Event</label><input value={form.client} onChange={e => set("client", e.target.value)} style={inp} placeholder="Client name (optional)" /></div>
              <div><label style={lbl}>Location *</label><input value={form.location} onChange={e => set("location", e.target.value)} style={inp} placeholder="City, Province" required /></div>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div><label style={lbl}>Event Type</label>
                <select value={form.eventType} onChange={e => set("eventType", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
                  <option value="">Select type...</option>
                  {["Festival","Corporate","School Event","Wedding","Live Performance","Conference","Other"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Event Date</label><input type="month" value={form.date} onChange={e => set("date", e.target.value)} style={inp} /></div>
            </div>

            {/* 📸 Dual Image Upload & Preview Interface Area */}
            <div style={{ padding: "1.25rem", background: "rgba(0,0,0,0.15)", border: "1px dashed rgba(201,168,76,0.12)", borderRadius: "0.6rem", marginTop: "0.5rem" }}>
              <label style={lbl}>Project Showcase Image</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", gap: "1.25rem", alignItems: "center" }}>
                <div>
                  <input value={form.image} onChange={e => set("image", e.target.value)} style={{ ...inp, marginBottom: "0.75rem" }} placeholder="Paste image web link link URL..." />
                  <label htmlFor="computer-upload" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "0.4rem", color: "var(--color-gold)", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600 }}>
                    <Upload size={13} /> Upload from Computer
                  </label>
                  <input id="computer-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                </div>
                <div style={{ width: "100%", height: "95px", background: "rgba(0,0,0,0.3)", borderRadius: "0.4rem", border: "1px solid rgba(201,168,76,0.08)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {form.image ? (
                    <img src={form.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ textAlign: "center", color: "var(--color-platinum-dim)", fontSize: "0.65rem" }}><ImageIcon size={16} style={{ opacity: 0.3, marginBottom: "0.2rem" }} /><p>Empty</p></div>
                  )}
                </div>
              </div>
            </div>

            <div><label style={lbl}>Project Overview *</label><textarea value={form.description} onChange={e => set("description", e.target.value)} rows={4} style={{ ...inp, resize: "vertical" }} placeholder="Describe the event and what So Productions delivered..." required /></div>
          </div>

          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={{ fontSize: "0.78rem", color: "var(--color-gold)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Case Study Details</p>
            <div><label style={lbl}>The Challenge</label><textarea value={form.challenge} onChange={e => set("challenge", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="What made this event difficult or unique?" /></div>
            <div><label style={lbl}>Our Solution</label><textarea value={form.solution} onChange={e => set("solution", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="How did So Productions solve the challenge?" /></div>
            <div><label style={lbl}>The Result</label><textarea value={form.result} onChange={e => set("result", e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="What was the outcome for the client?" /></div>
          </div>
        </div>

        <div>
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.5rem", position: "sticky", top: "2rem" }}>
            <p style={{ fontSize: "0.68rem", color: "var(--color-gold-dim)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1rem" }}>Publish</p>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={lbl}>Status</label>
              <select value={form.status} onChange={e => set("status", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <button onClick={handleSave} disabled={saving} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.8rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", cursor: saving ? "not-allowed" : "pointer", fontSize: "0.78rem", fontWeight: 700, opacity: saving ? 0.7 : 1 }}>
              {saving ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={14} />} {saving ? "Saving..." : "Save Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}