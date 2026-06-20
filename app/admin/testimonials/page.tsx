"use client";
import { useState } from "react";
import { Plus, Trash2, Star } from "lucide-react";

const mockTestimonials = [
  { id: "1", name: "Thabo Nkosi", role: "Event Director, Discovery Vitality", quote: "So Productions exceeded every expectation. The sound at our gala dinner was flawless.", stars: 5, status: "active" },
  { id: "2", name: "Samantha Geldenhuys", role: "Head of Arts, Pinelands High", quote: "We've used So Productions for three consecutive years. They know our venue better than we do.", stars: 5, status: "active" },
  { id: "3", name: "DJ Kairo", role: "Recording Artist", quote: "I needed guitar support at short notice. They pulled it off without a single issue.", stars: 5, status: "active" },
  { id: "4", name: "Lindiwe Dube", role: "Marketing Manager, MTN", quote: "Our product launch required perfect audio timing. So Productions delivered seamlessly.", stars: 5, status: "active" },
];

export default function AdminTestimonials() {
  const [items, setItems] = useState(mockTestimonials);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", quote: "", stars: "5" });

  const addItem = () => {
    if (!form.name || !form.quote) return;
    setItems(i => [...i, { id: Date.now().toString(), ...form, stars: parseInt(form.stars), status: "active" }]);
    setForm({ name: "", role: "", quote: "", stars: "5" }); setAdding(false);
  };

  const inp = { width: "100%", padding: "0.7rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.6rem", color: "var(--color-platinum)", fontSize: "0.875rem", outline: "none", fontFamily: "var(--font-body)" };

  return (
    <div style={{ padding: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-platinum)", fontWeight: 300 }}>Client <span style={{ color: "var(--color-gold)" }}>Testimonials</span></h1>
          <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.82rem", marginTop: "0.25rem" }}>These appear in the rotating slider on the home page</p>
        </div>
        <button onClick={() => setAdding(true)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
          <Plus size={15} /> Add Testimonial
        </button>
      </div>

      {adding && (
        <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "0.85rem", padding: "1.75rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontSize: "0.78rem", color: "var(--color-gold)", fontWeight: 600 }}>New Testimonial</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Client Name *" style={inp} />
            <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Role, Company" style={inp} />
          </div>
          <textarea value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} placeholder="Their testimonial quote *" rows={3} style={{ ...inp, resize: "vertical" }} />
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={addItem} style={{ padding: "0.65rem 1.5rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700 }}>Add</button>
            <button onClick={() => setAdding(false)} style={{ padding: "0.65rem 1.5rem", background: "transparent", color: "var(--color-platinum-dim)", borderRadius: "9999px", border: "1px solid rgba(201,168,76,0.2)", cursor: "pointer", fontSize: "0.78rem" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {items.map((t, i) => (
          <div key={t.id} style={{ padding: "1.5rem", background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem" }}>
                {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={13} fill="var(--color-gold)" color="var(--color-gold)" />)}
              </div>
              <p style={{ color: "var(--color-platinum)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.75rem", fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
              <p style={{ color: "var(--color-gold)", fontSize: "0.8rem", fontWeight: 600 }}>{t.name}</p>
              <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.75rem" }}>{t.role}</p>
            </div>
            <button onClick={() => { if (confirm("Remove?")) setItems(ts => ts.filter(x => x.id !== t.id)); }} style={{ width: "34px", height: "34px", background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Trash2 size={14} color="#e05050" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
