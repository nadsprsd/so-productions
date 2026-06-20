"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const items = [
  { id: 1, src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=75", alt: "Live concert", label: "Jazz Festival 2024", aspect: "16/9" },
  { id: 2, src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=75", alt: "Mixing console", label: "Studio Session", aspect: "4/5" },
  { id: 3, src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=75", alt: "Stage lights", label: "Stage Setup", aspect: "1/1" },
  { id: 4, src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=75", alt: "DJ performance", label: "Corporate Gala Night", aspect: "16/9" },
  { id: 5, src: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&q=75", alt: "PA system", label: "Stage Sound System", aspect: "4/5" },
  { id: 6, src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=75", alt: "Guitar live", label: "Guitar Support", aspect: "1/1" },
  { id: 7, src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=75", alt: "Singer on stage", label: "School Production", aspect: "16/9" },
  { id: 8, src: "https://images.unsplash.com/photo-1571266752420-9c2e2e6a4bd8?w=600&q=75", alt: "Mixing desk", label: "FOH Session", aspect: "1/1" },
  { id: 9, src: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&q=75", alt: "Festival crowd", label: "Wine Festival", aspect: "16/9" },
  { id: 10, src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=75", alt: "Concert stage", label: "Festival Main Stage", aspect: "4/5" },
  { id: 11, src: "https://images.unsplash.com/photo-1603555501671-8f96b3fce8b5?w=800&q=75", alt: "Producer in studio", label: "Music Production", aspect: "1/1" },
  { id: 12, src: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=75", alt: "Outdoor stage", label: "Durban Festival", aspect: "16/9" },
];

export function GalleryClient() {
  const ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<typeof items[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gal-hero", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
      gsap.fromTo(".gal-item", { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.06, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".gal-grid", start: "top 75%" } });
    }, ref);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", esc);
    return () => { ctx.revert(); window.removeEventListener("keydown", esc); };
  }, []);

  return (
    <div ref={ref} style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad">
        <div className="gal-hero" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Visual Proof</p>
          <h1 className="display-lg" style={{ color: "var(--color-platinum)" }}>Our <span className="gold-gradient">gallery</span></h1>
          <p style={{ color: "var(--color-platinum-dim)", maxWidth: "480px", margin: "1.25rem auto 0", lineHeight: 1.75 }}>Click any photo to enlarge.</p>
        </div>
        <div className="gal-grid" style={{ columns: "3 220px", gap: "1rem" }}>
          {items.map(item => (
            <div key={item.id} className="gal-item" onClick={() => setLightbox(item)}
              style={{ marginBottom: "1rem", breakInside: "avoid", position: "relative", borderRadius: "0.75rem", overflow: "hidden", aspectRatio: item.aspect, background: "var(--color-obsidian-surface)", border: "1px solid rgba(201,168,76,0.08)", cursor: "pointer", transition: "transform 0.3s, border-color 0.3s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.02)"; el.style.borderColor = "rgba(201,168,76,0.4)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; el.style.borderColor = "rgba(201,168,76,0.08)"; }}
            >
              <Image src={item.src} alt={item.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 600px) 100vw, 33vw" />
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-gold)" }}>
            <X size={20} />
          </button>
          <div style={{ position: "relative", width: "90vw", maxWidth: "1000px", aspectRatio: lightbox.aspect, borderRadius: "1rem", overflow: "hidden" }}>
            <Image src={lightbox.src.replace("w=800", "w=1200").replace("w=600", "w=1000")} alt={lightbox.alt} fill style={{ objectFit: "cover" }} sizes="90vw" />
          </div>
          <p style={{ position: "absolute", bottom: "2rem", color: "var(--color-platinum-dim)", fontSize: "0.85rem" }}>{lightbox.label}</p>
        </div>
      )}
    </div>
  );
}
