"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const previewImages = [
  { src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=75", alt: "Live concert", label: "Jazz Festival 2024", aspect: "16/9" },
  { src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=75", alt: "Mixing console", label: "Studio Session", aspect: "4/5" },
  { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=75", alt: "Stage lights", label: "Stage Setup", aspect: "1/1" },
  { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=75", alt: "DJ performance", label: "Corporate Gala", aspect: "16/9" },
  { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=75", alt: "Guitar performance", label: "Live Performance", aspect: "4/5" },
  { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75", alt: "Concert singer", label: "School Production", aspect: "1/1" },
];

export function GalleryPreview() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gallery-thumb", { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-pad" style={{ background: "var(--color-obsidian)" }}>
      <div className="container-main">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Visual Proof</p>
            <h2 className="display-lg" style={{ color: "var(--color-platinum)" }}>Our <span className="gold-gradient">gallery</span></h2>
          </div>
          <Link href="/gallery" className="btn-ghost">All Photos <ArrowRight size={14} /></Link>
        </div>
        <div style={{ columns: "3 200px", gap: "1rem" }}>
          {previewImages.map((item, i) => (
            <div key={i} className="gallery-thumb" style={{ marginBottom: "1rem", breakInside: "avoid", position: "relative", borderRadius: "0.75rem", overflow: "hidden", aspectRatio: item.aspect, opacity: 0, border: "1px solid rgba(201,168,76,0.08)" }}>
              <Image src={item.src} alt={item.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 50vw, 33vw" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 60%)" }} />
              <p style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", color: "var(--color-platinum)", fontSize: "0.72rem", fontWeight: 500 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
