"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // 👈 Imported Next.js Image component
import { MapPin, Calendar, ArrowRight, Loader2 } from "lucide-react";

interface WorkItem {
  id: string;
  _id?: string;
  title: string;
  type: string;
  category?: string;
  location: string;
  date: string;
  tags?: string[];
  challenge?: string;
  description?: string;
  solution?: string;
  result?: string;
  image?: string; // 👈 Added image path type support
}

const fallbackWorks = [
  { id: "1", title: "Johannesburg Jazz Festival", type: "Festival", location: "Johannesburg, GP", date: "March 2024", tags: ["LINE ARRAY", "FOH", "OUTDOOR"], image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80" },
  { id: "2", title: "Discovery Vitality Gala", type: "Corporate", location: "Sandton, GP", date: "November 2023", tags: ["CORPORATE", "LIVE BAND", "INDOOR"], image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80" },
  { id: "3", title: "Pinelands High School Musical", type: "School", location: "Cape Town, WC", date: "August 2023", tags: ["SCHOOL", "THEATRE", "WIRELESS"], image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&q=80" },
];

export default function WorksPage() {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublicWorks() {
      try {
        const res = await fetch("/api/admin/works");
        if (!res.ok) throw new Error("Failed fetch");
        const data = await res.json();
        
        // Maps backend data with fallbacks cleanly
        const parsedData = data.map((item: any) => ({
          ...item,
          id: item.id || item._id,
          type: item.type || item.category || "Production Showcase"
        }));

        setWorks(parsedData.length > 0 ? parsedData : fallbackWorks);
      } catch (err) {
        console.error("Error reading public data track:", err);
        setWorks(fallbackWorks);
      } finally {
        setLoading(false);
      }
    }
    loadPublicWorks();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "var(--color-obsidian)", minHeight: "100vh", color: "var(--color-platinum-dim)" }}>
        <Loader2 size={20} className="animate-spin" style={{ color: "var(--color-gold)" }} />
        <p>Loading production portfolio tracks...</p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad">
        <h1 className="display-lg" style={{ color: "var(--color-platinum)", marginBottom: "3rem", textAlign: "center", fontWeight: 300 }}>
          Our <span className="gold-gradient">Works</span>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
          {works.map((w) => (
            <div key={w.id} className="glass" style={{ borderRadius: "1.25rem", overflow: "hidden", border: "1px solid rgba(201,168,76,0.12)", background: "var(--color-obsidian-light)", transition: "transform 0.3s ease" }}>
              
              {/* 📸 FIXED: Renders the case study showcase feature image completely dynamic */}
              <div style={{ height: "240px", position: "relative", width: "100%", overflow: "hidden", background: "#000" }}>
                <Image 
                  src={w.image || "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&q=80"} 
                  alt={w.title}
                  fill
                  style={{ objectFit: "cover", opacity: 0.85 }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Elegant bottom darkening layer inside card frame */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%)" }} />

                {/* Tags Layout Overlay */}
                <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem", display: "flex", gap: "0.4rem", flexWrap: "wrap", zIndex: 2 }}>
                  {(w.tags && w.tags.length > 0 ? w.tags : [w.type]).map(t => (
                    <span key={t} style={{ padding: "0.2rem 0.6rem", background: "rgba(8,8,8,0.85)", backdropFilter: "blur(4px)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px", fontSize: "0.62rem", color: "var(--color-gold)", letterSpacing: "0.05em", fontWeight: 600, textTransform: "uppercase" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Text Block Content */}
              <div style={{ padding: "1.75rem" }}>
                <span style={{ fontSize: "0.68rem", color: "var(--color-gold-dim)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{w.type}</span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", color: "var(--color-platinum)", fontWeight: 400, marginTop: "0.25rem", marginBottom: "0.75rem" }}>{w.title}</h2>
                
                {/* Meta location elements matching template style */}
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", fontSize: "0.75rem", color: "var(--color-platinum-dim)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><MapPin size={12} color="var(--color-gold)" /> {w.location}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><Calendar size={12} color="var(--color-gold)" /> {w.date}</span>
                </div>

                <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem", height: "4.8em", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                  {w.challenge || w.description || "Premium live audio engineering and tactical sound architecture deployment."}
                </p>
                
                <Link href={`/works/${w.id}`} style={{ color: "var(--color-gold)", textDecoration: "none", fontSize: "0.82rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  View case study <ArrowRight size={14} />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}