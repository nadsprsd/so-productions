"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

// Fallback items in case the database is completely empty or server fails
const fallbackLocations = [
  { city: "Johannesburg", province: "Gauteng", events: "180+" },
  { city: "Cape Town", province: "Western Cape", events: "120+" },
  { city: "Pretoria", province: "Gauteng", events: "60+" },
  { city: "Durban", province: "KwaZulu-Natal", events: "30+" },
];

interface LocationItem {
  id?: string;
  city?: string;
  name?: string; // fallback if database key uses name instead of city
  province: string;
  events: string | number;
}

export function LocationsPreview() {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const res = await fetch("/api/admin/locations");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        // If your API returns data, use it; otherwise fall back to the main 4 active items
        setLocations(data.length > 0 ? data : fallbackLocations);
      } catch (error) {
        console.error("Error loading locations on frontend:", error);
        setLocations(fallbackLocations);
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  if (loading) {
    return (
      <section className="section-pad" style={{ background: "var(--color-obsidian-light)", textAlign: "center", color: "var(--color-platinum-dim)" }}>
        <div>Loading locations...</div>
      </section>
    );
  }

  return (
    <section className="section-pad" style={{ background: "var(--color-obsidian-light)" }}>
      <div className="container-main">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Where We Work</p>
            <h2 className="display-lg" style={{ color: "var(--color-platinum)" }}>
              Serving <span className="gold-gradient">Across New Jersey</span>
            </h2>
          </div>
          <Link href="/locations" className="btn-ghost">All Locations <ArrowRight size={14} /></Link>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {locations.map((loc, i) => (
            <Link key={loc.id || i} href="/locations" style={{
              display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.5rem",
              background: "rgba(201,168,76,0.03)", border: "1px solid rgba(201,168,76,0.08)",
              borderRadius: "0.85rem", textDecoration: "none", transition: "all 0.25s ease",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.25)"; el.style.background = "rgba(201,168,76,0.06)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.08)"; el.style.background = "rgba(201,168,76,0.03)"; }}
            >
              <MapPin size={18} color="var(--color-gold-dim)" style={{ flexShrink: 0 }} />
              <div>
                {/* Accommodates both field key names ('city' or 'name') depending on database scheme */}
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-platinum)", fontWeight: 400 }}>
                  {loc.city || loc.name}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-platinum-dim)" }}>
                  {loc.province} · {loc.events} events
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}