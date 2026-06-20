"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";

const mockItems = [
  { id: "1", src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=60", label: "Jazz Festival 2024", type: "image" },
  { id: "2", src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=60", label: "Studio Session", type: "image" },
  { id: "3", src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=60", label: "Stage Setup", type: "image" },
  { id: "4", src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&q=60", label: "Corporate Gala", type: "image" },
  { id: "5", src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=60", label: "Guitar Support", type: "image" },
  { id: "6", src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=60", label: "School Production", type: "image" },
];

export default function AdminGallery() {
  const [items, setItems] = useState(mockItems);
  const [adding, setAdding] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const addItem = () => {
    if (!newUrl || !newLabel) return;
    setItems(i => [...i, { id: Date.now().toString(), src: newUrl, label: newLabel, type: "image" }]);
    setNewUrl(""); setNewLabel(""); setAdding(false);
  };

  return (
    <div style={{ padding: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-platinum)", fontWeight: 300 }}>Gallery <span style={{ color: "var(--color-gold)" }}>Media</span></h1>
          <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.82rem", marginTop: "0.25rem" }}>{items.length} items · Add photos and videos from events</p>
        </div>
        <button onClick={() => setAdding(true)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
          <Plus size={15} /> Add Photo
        </button>
      </div>

      {adding && (
        <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "0.85rem", padding: "1.5rem", marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontSize: "0.78rem", color: "var(--color-gold)", fontWeight: 600 }}>Add New Photo</p>
          <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="Image URL (from Cloudinary or Unsplash)" style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.6rem", color: "var(--color-platinum)", fontSize: "0.875rem", outline: "none" }} />
          <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Caption / Label" style={{ padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.6rem", color: "var(--color-platinum)", fontSize: "0.875rem", outline: "none" }} />
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={addItem} style={{ padding: "0.65rem 1.5rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700 }}>Add to Gallery</button>
            <button onClick={() => setAdding(false)} style={{ padding: "0.65rem 1.5rem", background: "transparent", color: "var(--color-platinum-dim)", borderRadius: "9999px", border: "1px solid rgba(201,168,76,0.2)", cursor: "pointer", fontSize: "0.78rem" }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {items.map(item => (
          <div key={item.id} style={{ position: "relative", borderRadius: "0.75rem", overflow: "hidden", border: "1px solid rgba(201,168,76,0.1)", aspectRatio: "1/1", background: "var(--color-obsidian-surface)" }}>
            <Image src={item.src} alt={item.label} fill style={{ objectFit: "cover" }} sizes="200px" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%)" }}>
              <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", right: "0.75rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <p style={{ color: "var(--color-platinum)", fontSize: "0.72rem", fontWeight: 500, flex: 1 }}>{item.label}</p>
                <button onClick={() => { if (confirm("Remove from gallery?")) setItems(i => i.filter(x => x.id !== item.id)); }} style={{ width: "28px", height: "28px", background: "rgba(220,50,50,0.8)", border: "none", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginLeft: "0.5rem" }}>
                  <Trash2 size={12} color="white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
