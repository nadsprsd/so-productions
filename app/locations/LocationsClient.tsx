"use client";
import { useEffect, useState, useRef } from "react"; 
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface LocationItem {
  id?: string;
  city?: string;
  name?: string; // Fallback helper matching standard data definitions
  province: string;
  description?: string;
  events: string | number;
  services?: string[];
}

// 🛠️ The initial default fallback list in case database records drop
const fallbackLocations = [
  { 
    city: "Newark", 
    province: "New Jersey", 
    description: "Our primary hub. We service every major venue across Northern New Jersey, from professional convention centers to large-scale stadium productions.", 
    events: "180+", 
    services: ["Corporate Events", "Live Concerts", "School Functions"] 
  },
  { 
    city: "Philadelphia", 
    province: "Pennsylvania", 
    description: "Serving the historic city center, university districts, and vibrant outdoor event spaces throughout the Greater Philadelphia region.", 
    events: "120+", 
    services: ["Festivals", "Corporate Events", "Weddings"] 
  },
  { 
    city: "Atlantic City", 
    province: "New Jersey", 
    description: "Specializing in high-end resort audio, entertainment venue support, and large-scale beachfront festival productions.", 
    events: "60+", 
    services: ["Concerts", "Resort Events", "Corporate"] 
  },
  { 
    city: "New York City", 
    province: "New York", 
    description: "Expert audio support for NYC's busiest venues, providing seamless sound engineering for high-profile city functions and events.", 
    events: "30+", 
    services: ["Outdoor Events", "Festivals", "Corporate"] 
  },
];

export function LocationsClient() {
  const ref = useRef<HTMLDivElement>(null);
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch real dynamic database array records on page mount
  useEffect(() => {
    async function fetchLiveLocations() {
      try {
        const res = await fetch("/api/admin/locations");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setLocations(data.length > 0 ? data : fallbackLocations);
      } catch (err) {
        console.error("Failed to read dynamic location data:", err);
        setLocations(fallbackLocations);
      } finally {
        setLoading(false);
      }
    }
    fetchLiveLocations();
  }, []);

  // 2. Run GSAP layout entry animations once the content loads completely
  useEffect(() => {
    if (loading || locations.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".loc-hero", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
      gsap.fromTo(".loc-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".loc-grid", start: "top 75%" } });
    }, ref);

    return () => ctx.revert();
  }, [loading, locations]);

  if (loading) {
    return (
      <div style={{ paddingTop: "12rem", background: "var(--color-obsidian)", minHeight: "100vh", textAlign: "center", color: "var(--color-platinum-dim)" }}>
        <p>Loading service locations...</p>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad">
        <div className="loc-hero" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Where We Work</p>
          <h1 className="display-lg" style={{ color: "var(--color-platinum)" }}>Serving <span className="gold-gradient">New Jersey and Philadelphia</span></h1>
          <p style={{ color: "var(--color-platinum-dim)", maxWidth: "520px", margin: "1.25rem auto 0", lineHeight: 1.75 }}>Based in New Jersey and Philadelphia, we travel across the East Coast for the right production event.</p>
        </div>
        
        <div className="loc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {locations.map((loc, i) => (
            <div key={loc.id || i} className="loc-card glass" style={{ padding: "2.5rem", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.35)"; el.style.boxShadow = "0 20px 60px rgba(201,168,76,0.1)"; el.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.12)"; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <MapPin size={20} color="var(--color-gold)" />
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--color-platinum)", fontWeight: 400 }}>
                    {loc.city || loc.name}
                  </h2>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-gold-dim)" }}>{loc.province} · {loc.events} events</p>
                </div>
              </div>
              <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                {loc.description || "Providing premium live sound engineering, production support, and exceptional setup hardware infrastructure across the region."}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {(loc.services || ["Live Sound", "Audio Production", "Event Setup"]).map(s => (
                  <span key={s} style={{ padding: "0.2rem 0.65rem", background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "9999px", fontSize: "0.68rem", color: "var(--color-platinum-dim)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <p style={{ color: "var(--color-platinum-dim)", marginBottom: "1.5rem" }}>Don&apos;t see your city? We travel. Get in touch.</p>
          <Link href="/contact" className="btn-primary"><span>Enquire About Your Location</span><ArrowRight size={14} /></Link>
        </div>
      </div>
    </div>
  );
}