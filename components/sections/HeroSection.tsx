"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 🛠️ EXPANDED AMBIENT CHORDS DATASET: More instances with balanced variations
const NOTES = [
  { x: "6%", y: "20%", size: 24, delay: 0, dur: 7 },
  { x: "88%", y: "15%", size: 18, delay: 1.5, dur: 8 },
  { x: "12%", y: "65%", size: 20, delay: 0.8, dur: 6 },
  { x: "82%", y: "58%", size: 16, delay: 2.2, dur: 7.5 },
  { x: "48%", y: "78%", size: 14, delay: 1.8, dur: 6.5 },
  { x: "25%", y: "40%", size: 18, delay: 3.0, dur: 9 },
  { x: "72%", y: "35%", size: 22, delay: 0.5, dur: 8.5 },
  { x: "35%", y: "85%", size: 15, delay: 4.2, dur: 7 }
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.fromTo(".hero-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(".hero-line-1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.5")
        .fromTo(".hero-line-2", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.7")
        .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(".hero-cta", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-stats-row", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");

      // 🛠️ BALANCED SPEED DRIFT: Smooth, continuous floating note tracking loops
      gsap.fromTo(".float-note",
        { y: 30, opacity: 0, scale: 0.8 },
        { 
          y: -60, 
          opacity: 0.35, 
          scale: 1, 
          stagger: 0.25, 
          duration: 4.5, 
          ease: "power1.out",
          delay: 0.5 
        }
      );

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (headingRef.current) gsap.set(headingRef.current, { y: self.progress * 40 });
          if (notesRef.current) gsap.set(notesRef.current, { y: self.progress * 60 });
          gsap.set(".hero-bg-img", { y: self.progress * 30 });
        },
      });

      // 🛠️ ACTIVE WAVEFORM OSCILLATION: Restored animation looping with balanced, natural cadence
      const bars = document.querySelectorAll(".hero-wave-bar");
      bars.forEach((bar, i) => {
        gsap.to(bar, { 
          scaleY: gsap.utils.random(0.25, 0.95), 
          duration: gsap.utils.random(0.5, 0.95), 
          repeat: -1, 
          yoyo: true, 
          ease: "sine.inOut", 
          delay: i * 0.04 
        });
      });
    }, heroRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "6rem", paddingBottom: "3rem" }}>
      
      <div className="hero-bg-img" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80"
          alt="Live concert sound production"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          sizes="100vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.7) 60%, rgba(8,8,8,0.98) 100%)" }} />
      </div>

      {/* Floating Ambient Chords Canvas */}
      <div ref={notesRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {NOTES.map((note, i) => (
          <div key={i} className="float-note" style={{ position: "absolute", left: note.x, top: note.y, opacity: 0 }}>
            <MusicNote size={note.size} />
          </div>
        ))}
      </div>

      <div className="container-main" style={{ textAlign: "center", position: "relative", zIndex: 2, width: "100%", padding: "0 1rem" }}>
        {/* 🛠️ HIGH-DENSITY WAVEFORM METER BAR GRID */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: isMobile ? "2px" : "3px", height: "36px", marginBottom: "2rem" }}>
          {Array.from({ length: isMobile ? 18 : 28 }).map((_, i) => (
            <div key={i} className="hero-wave-bar" style={{ width: "3px", height: `${8 + Math.sin(i * 0.4) * 8}px`, background: "linear-gradient(to top, var(--color-gold-dim), var(--color-gold-light))", borderRadius: "1.5px", transformOrigin: "bottom" }} />
          ))}
        </div>

        <p className="eyebrow hero-eyebrow" style={{ marginBottom: "1rem", opacity: 0, fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)", letterSpacing: "0.12em" }}>
          Premium Sound & Event Production · Across New Jersey
        </p>

        <h1 ref={headingRef} style={{ marginBottom: "1.25rem" }}>
          <span className="display-xl hero-line-1" style={{ display: "block", color: "var(--color-platinum)", opacity: 0, fontSize: "clamp(2rem, 5.5vw, 4rem)", lineHeight: 1.15 }}>Sound that moves</span>
          <span className="display-xl hero-line-2 gold-gradient shimmer" style={{ display: "block", opacity: 0, fontSize: "clamp(2rem, 5.5vw, 4rem)", lineHeight: 1.15 }}>people.</span>
        </h1>

        <p className="hero-sub" style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)", color: "var(--color-platinum-dim)", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.6, opacity: 0 }}>
          From school concerts to festival main stages, we engineer sound that doesn&apos;t just fill a room. It defines the moment.
        </p>

        <div className="hero-cta" style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem", opacity: 0 }}>
          <Link href="/contact" className="btn-primary" style={{ padding: "0.7rem 1.5rem", fontSize: "0.78rem" }}><span>Book Your Event</span><ArrowRight size={14} /></Link>
          <Link href="/works" className="btn-ghost" style={{ padding: "0.7rem 1.5rem", fontSize: "0.78rem" }}>View Our Work</Link>
        </div>

        <div className="hero-stats-row hero-stats glass-stats-wrapper" style={{ display: isMobile ? "none" : "inline-flex", flexWrap: "wrap", justifyContent: "center", opacity: 0, borderRadius: "1rem", overflow: "hidden" }}>
          {[
            { value: "6+", label: "Years" },
            { value: "400+", label: "Events" },
            { value: "50+", label: "Clients" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div key={i} style={{ padding: "1rem 1.75rem", borderRight: i < 3 ? "1px solid rgba(201,168,76,0.15)" : "none", textAlign: "center", minWidth: "120px" }}>
              <div className="display-sm" style={{ color: "var(--color-gold)", fontSize: "1.5rem", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "0.62rem", color: "var(--color-platinum-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.2rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", zIndex: 2 }}>
        <span style={{ fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-platinum-dim)" }}>Scroll</span>
        <ChevronDown size={14} color="var(--color-gold-dim)" />
      </div>
    </section>
  );
}

function MusicNote({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
  );
}