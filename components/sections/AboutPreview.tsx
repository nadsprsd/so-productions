"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

export function AboutPreview() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-img-block", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
      gsap.fromTo(".about-text-block", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" }, delay: 0.2 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-pad" style={{ background: "var(--color-obsidian)" }}>
      <div className="container-main">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "5rem", alignItems: "center" }}>
          {/* Image */}
          <div className="about-img-block" style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "-16px", left: "-16px", right: "16px", bottom: "16px", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "1rem", pointerEvents: "none", zIndex: 0 }} />
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(201,168,76,0.1)" }}>
              {/* Real image: sound engineer at mixing board */}
              <Image
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80"
                alt="Sound engineer at mixing console"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 60%)" }} />
            </div>
            {/* Floating badge */}
            <div className="glass" style={{ position: "absolute", bottom: "2rem", right: "-1.5rem", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", zIndex: 2 }}>
              <div style={{ width: "8px", height: "8px", background: "var(--color-gold)", borderRadius: "50%", boxShadow: "0 0 8px var(--color-gold)", flexShrink: 0, animation: "floatNote 2s ease-in-out infinite" }} />
              <div>
                <div style={{ fontSize: "0.65rem", color: "var(--color-gold)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Available Now</div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-platinum)", fontWeight: 500 }}>For your next event</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="about-text-block">
            <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Our Story</p>
            <h2 className="display-md" style={{ color: "var(--color-platinum)", marginBottom: "1.5rem" }}>Born from a passion for <span className="gold-gradient">authentic sound</span></h2>
            <div style={{ height: "1px", background: "linear-gradient(90deg, var(--color-gold-dim), transparent)", marginBottom: "1.5rem", width: "80px" }} />
            <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "0.95rem" }}>
              So Productions was built on a simple belief: every event deserves sound that feels intentional. Not just loud — but clear, powerful, and perfectly suited to the moment.
            </p>
            <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.85, marginBottom: "2rem", fontSize: "0.95rem" }}>
              From our first school event to multi-stage festival productions, we&apos;ve grown by putting craft before everything else. No shortcuts. No compromises.
            </p>
            <div style={{ display: "flex", gap: "2rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
              {[{ value: "2018", label: "Founded" }, { value: "JHB & CPT", label: "Based in" }, { value: "National", label: "Coverage" }].map((item, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--color-gold)", fontWeight: 300 }}>{item.value}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--color-platinum-dim)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.label}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn-ghost">Learn More <ArrowRight size={14} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
