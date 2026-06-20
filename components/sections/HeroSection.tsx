"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NOTES = [
  { x: "8%", y: "25%", size: 22, delay: 0, dur: 5 },
  { x: "84%", y: "18%", size: 17, delay: 1.2, dur: 6 },
  { x: "14%", y: "68%", size: 19, delay: 0.6, dur: 4.5 },
  { x: "77%", y: "64%", size: 15, delay: 2, dur: 5.5 },
  { x: "50%", y: "80%", size: 13, delay: 1.5, dur: 4 },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState(1200); // Safe design default fallback for compilation execution

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-eyebrow", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
        .fromTo(".hero-line-1", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo(".hero-line-2", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.7")
        .fromTo(".hero-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.4")
        .fromTo(".hero-stats", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.3");

      gsap.fromTo(".float-note",
        { opacity: 0, scale: 0 },
        { opacity: 0.4, scale: 1, stagger: 0.3, duration: 1, ease: "back.out(1.7)", delay: 1.5 }
      );

      ScrollTrigger.create({
        trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.5,
        onUpdate: (self) => {
          gsap.set(headingRef.current, { y: self.progress * 80 });
          gsap.set(notesRef.current, { y: self.progress * 120 });
          gsap.set(".hero-bg-img", { y: self.progress * 60 });
        },
      });

      document.querySelectorAll(".hero-wave-bar").forEach((bar, i) => {
        gsap.to(bar, { scaleY: gsap.utils.random(0.3, 1), duration: gsap.utils.random(0.4, 0.9), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.08 });
      });
    }, heroRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "6rem", paddingBottom: "4rem" }}>
      
      <div className="hero-bg-img" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80"
          alt="Live concert sound production"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          sizes="100vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.65) 50%, rgba(8,8,8,0.92) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
      </div>

      <div ref={notesRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {NOTES.map((note, i) => (
          <div key={i} className="float-note" style={{ position: "absolute", left: note.x, top: note.y, opacity: 0, animation: `floatNote ${note.dur}s ease-in-out ${note.delay}s infinite` }}>
            <MusicNote size={note.size} />
          </div>
        ))}
      </div>

      <div className="container-main" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "4px", height: "48px", marginBottom: "2.5rem" }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="hero-wave-bar" style={{ width: "3px", height: `${14 + Math.sin(i * 0.6) * 10}px`, background: "linear-gradient(to top, var(--color-gold-dim), var(--color-gold-light))", borderRadius: "2px", transformOrigin: "bottom" }} />
          ))}
        </div>

        <p className="eyebrow hero-eyebrow" style={{ marginBottom: "1.5rem", opacity: 0 }}>Premium Sound & Event Production · Across New Jersey</p>

        <h1 ref={headingRef} style={{ marginBottom: "1.5rem" }}>
          <span className="display-xl hero-line-1" style={{ display: "block", color: "var(--color-platinum)", opacity: 0 }}>Sound that moves</span>
          <span className="display-xl hero-line-2 gold-gradient shimmer" style={{ display: "block", opacity: 0 }}>people.</span>
        </h1>

        <p className="hero-sub" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "var(--color-platinum-dim)", maxWidth: "560px", margin: "0 auto 3rem", lineHeight: 1.75, opacity: 0 }}>
          From school concerts to festival main stages  we engineer sound that doesn&apos;t just fill a room. It defines the moment.
        </p>

        <div className="hero-cta" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem", opacity: 0 }}>
          <Link href="/contact" className="btn-primary"><span>Book Your Event</span><ArrowRight size={16} /></Link>
          <Link href="/works" className="btn-ghost">View Our Work</Link>
        </div>

        {/* Stats Grid Matrix */}
        <div className="hero-stats glass" style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", opacity: 0, borderRadius: "1rem", overflow: "hidden" }}>
          {[
            { value: "6+", label: "Years" },
            { value: "400+", label: "Events" },
            { value: "50+", label: "Clients" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div 
              key={i} 
              style={{ 
                padding: "1.1rem 2rem", 
                minWidth: "135px",
                textAlign: "center",
                // 🛠️ Structural Responsive Borders prevent lines from slashing stacked metrics on wrap
                borderRight: i < 3 && !isMobile ? "1px solid rgba(201,168,76,0.15)" : "none", 
                borderBottom: i < 3 && isMobile ? "1px solid rgba(201,168,76,0.12)" : "none",
              }}
            >
              <div className="display-sm" style={{ color: "var(--color-gold)", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--color-platinum-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.3rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", animation: "floatNote 2s ease-in-out infinite", zIndex: 2 }}>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-platinum-dim)" }}>Scroll</span>
        <ChevronDown size={16} color="var(--color-gold-dim)" />
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