"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Headphones, Music, Disc3, Speaker, GraduationCap, Guitar } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: <Headphones size={32} />, title: "Sound Engineering", slug: "sound-engineering", description: "Live FOH mixing, monitor engineering, and studio-grade sound for any event scale." },
  { icon: <Music size={32} />, title: "Music Production", slug: "music-production", description: "Full-service recording, arrangement, mixing and mastering for artists and labels." },
  { icon: <Disc3 size={32} />, title: "DJ Services", slug: "dj-services", description: "Professional DJ performance for corporate nights, weddings, and private events." },
  { icon: <Speaker size={32} />, title: "Stage Sound Systems", slug: "stage-sound", description: "Line array design, sub configuration, and full PA deployment for large-scale events." },
  { icon: <GraduationCap size={32} />, title: "School Event Sound", slug: "school-event-sound", description: "Reliable, affordable audio for school productions, concerts, and prize-givings." },
  { icon: <Guitar size={32} />, title: "Guitar Support", slug: "guitar-support", description: "Amp tech, pedalboard routing, IEM systems, and live guitar support for performers." },
];

export function ServicesClient() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".svc-hero-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
      gsap.fromTo(".svc-card", { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".svc-grid", start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad">
        <div className="svc-hero-text" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>What We Offer</p>
          <h1 className="display-lg" style={{ color: "var(--color-platinum)" }}>Our <span className="gold-gradient">services</span></h1>
          <p style={{ color: "var(--color-platinum-dim)", maxWidth: "520px", margin: "1.25rem auto 0", lineHeight: 1.75 }}>Whether you need a single sound engineer or a full production team, we have the expertise to deliver.</p>
        </div>
        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {services.map((svc, i) => (
            <Link key={i} href={`/services/${svc.slug}`} className="svc-card glass" style={{ display: "block", padding: "2.5rem", textDecoration: "none", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.4)"; el.style.boxShadow = "0 20px 60px rgba(201,168,76,0.12)"; el.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.12)"; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: "60px", height: "60px", background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)", marginBottom: "1.5rem" }}>{svc.icon}</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "0.75rem" }}>{svc.title}</h2>
              <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>{svc.description}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-gold)", fontSize: "0.78rem", fontWeight: 500 }}>Learn more <ArrowRight size={13} /></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

