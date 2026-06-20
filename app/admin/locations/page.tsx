"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function AdminLocations() {
  const [locs, setLocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ city: "", province: "", events: "" });

  // 1. Fetch live locations from the API route when the admin page opens
  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/admin/locations");
      if (res.ok) {
        const data = await res.json();
        setLocs(data);
      }
    } catch (err) {
      console.error("Error reading data from API endpoint:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // 2. Add Location handler: Persists the item directly into your locations.json file
  const add = async () => {
    if (!form.city) return;
    try {
      const res = await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        // Reload list from database file to stay perfectly synced
        await fetchLocations();
        setForm({ city: "", province: "", events: "" });
        setAdding(false);
      }
    } catch (err) {
      console.error("Failed to add new location item:", err);
    }
  };

  // 3. Delete Location handler: Sends a clear signal to wipe the record out of the file
  const handleDelete = async (city: string) => {
    if (!confirm(`Are you sure you want to remove ${city}?`)) return;
    try {
      const res = await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", city }),
      });

      if (res.ok) {
        // Instantly reload list from database file so it drops out of the array
        await fetchLocations();
      }
    } catch (err) {
      console.error("Failed to remove location record:", err);
    }
  };

  const inp = { padding: "0.7rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.6rem", color: "var(--color-platinum)", fontSize: "0.875rem", outline: "none", fontFamily: "var(--font-body)" };

  if (loading) {
    return (
      <div style={{ padding: "2.5rem", color: "var(--color-platinum-dim)" }}>
        Loading location panel database records...
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-platinum)", fontWeight: 300 }}>Service <span style={{ color: "var(--color-gold)" }}>Locations</span></h1>
        <button onClick={() => setAdding(true)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}><Plus size={15} /> Add Location</button>
      </div>

      {adding && (
        <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "0.85rem", padding: "1.5rem", marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="City *" style={inp} />
          <input value={form.province} onChange={e => setForm(f => ({ ...f, province: e.target.value }))} placeholder="Province" style={inp} />
          <input value={form.events} onChange={e => setForm(f => ({ ...f, events: e.target.value }))} placeholder="Events (e.g. 10+)" style={inp} />
          <button onClick={add} style={{ padding: "0.7rem 1.5rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700 }}>Add</button>
          <button onClick={() => setAdding(false)} style={{ padding: "0.7rem 1.5rem", background: "transparent", color: "var(--color-platinum-dim)", borderRadius: "9999px", border: "1px solid rgba(201,168,76,0.2)", cursor: "pointer", fontSize: "0.78rem" }}>Cancel</button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {locs.length === 0 ? (
          <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.85rem" }}>No locations configured. Click Add Location to start.</p>
        ) : (
          locs.map(loc => (
            <div key={loc.id || loc.city} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem" }}>
              <div>
                <span style={{ fontSize: "0.9rem", color: "var(--color-platinum)", fontWeight: 500 }}>{loc.city}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--color-platinum-dim)", marginLeft: "0.75rem" }}>{loc.province} · {loc.events} events</span>
              </div>
              <button onClick={() => handleDelete(loc.city)} style={{ width: "32px", height: "32px", background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Trash2 size={14} color="#e05050" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}