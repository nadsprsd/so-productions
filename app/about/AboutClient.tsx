"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: "Craft First", description: "Every cable, every EQ, every monitor mix gets the attention it deserves — because your audience can feel the difference between care and shortcuts." },
  { title: "Honest Communication", description: "We tell you what's achievable. No overselling. No hidden costs. Just straight talk about what we can deliver and how we'll do it." },
  { title: "Always Learning", description: "Audio technology evolves fast. We invest continuously in training and equipment so you always get capable, current sound production." },
  { title: "Community Roots", description: "We grew up in the local events scene — school shows, church events, community concerts. We're proud of where we started." },
];

export function AboutClient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-hero-text", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
      gsap.fromTo(".about-founder-img", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-founder", start: "top 75%" } });
      gsap.fromTo(".about-founder-text", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2, scrollTrigger: { trigger: ".about-founder", start: "top 75%" } });
      gsap.fromTo(".mvv-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".mvv-grid", start: "top 75%" } });
      gsap.fromTo(".value-item", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".values-grid", start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>

      {/* Hero with real image */}
      <section style={{ position: "relative", minHeight: "55vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          {/* 📸 FIXED: Used direct production source CDN URLs for high contrast audio layout images */}
          <Image 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1920" 
            alt="Professional speaker system on stage" 
            fill 
            style={{ objectFit: "cover" }} 
            priority 
            sizes="100vw" 
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,8,8,0.95) 40%, rgba(8,8,8,0.5) 100%)" }} />
        </div>
        <div className="container-main section-pad-sm about-hero-text" style={{ position: "relative" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Our Story</p>
          <h1 className="display-lg" style={{ color: "var(--color-platinum)", maxWidth: "600px", marginBottom: "1.5rem" }}>
            We exist to make your event sound <span className="gold-gradient">unforgettable.</span>
          </h1>
          <p style={{ color: "var(--color-platinum-dim)", maxWidth: "500px", lineHeight: 1.8, fontSize: "1.05rem" }}>
            So Productions started with one mixer, a pair of speakers, and a deep belief that great sound changes how people experience an event.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="section-pad about-founder" style={{ background: "var(--color-obsidian-light)" }}>
        <div className="container-main" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "center" }}>
          <div className="about-founder-img" style={{ position: "relative", aspectRatio: "3/4", borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(201,168,76,0.1)" }}>
            {/* 📸 FIXED: Swapped out the old webpage address for a direct console mixer file path */}
            <Image 
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200" 
              alt="Sound engineer working at mixing desk" 
              fill 
              style={{ objectFit: "cover" }} 
              sizes="(max-width: 768px) 100vw, 50vw" 
            />
          </div>
          <div className="about-founder-text">
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>The Founder</p>
            <h2 className="display-md" style={{ color: "var(--color-platinum)", marginBottom: "1.5rem" }}>A passion that started <span className="gold-gradient">early</span></h2>
            <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.85, marginBottom: "1.25rem" }}>Long before there was a company, there was just someone backstage at a school concert, fascinated by the mixing board. That curiosity turned into obsession, obsession into skill, and skill into So Productions.</p>
            <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.85, marginBottom: "1.25rem" }}>We started small — local school productions, church events, small corporate gatherings. Each job taught us something new about rooms, audiences, and the invisible art of making sound feel right.</p>
            <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.85 }}>Today we work across South Africa. But the mindset hasn&apos;t changed: show up prepared, listen carefully, and deliver sound that moves people.</p>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Approach */}
      <section className="section-pad" style={{ background: "var(--color-obsidian)" }}>
        <div className="container-main mvv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {[
            { label: "Our Mission", title: "Sound that serves the moment.", body: "To provide exceptional audio production that enhances every event — not overwhelms it. We measure success by how the audience feels." },
            { label: "Our Vision", title: "The most trusted name in African event audio.", body: "To become the go-to production partner for events across South Africa and beyond — known for reliability, quality, and genuine care." },
            { label: "Our Approach", title: "Preparation meets adaptability.", body: "We over-prepare so we can under-react. When the unexpected happens on the day, our team adapts calmly because we've thought three steps ahead." },
          ].map((item, i) => (
            <div key={i} className="mvv-card glass" style={{ padding: "2.5rem" }}>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>{item.label}</p>
              <h3 className="display-sm" style={{ color: "var(--color-platinum)", marginBottom: "1rem" }}>{item.title}</h3>
              <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.8, fontSize: "0.9rem" }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ background: "var(--color-obsidian-light)" }}>
        <div className="container-main">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>What We Stand For</p>
            <h2 className="display-lg" style={{ color: "var(--color-platinum)" }}>Our <span className="gold-gradient">values</span></h2>
          </div>
          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {values.map((v, i) => (
              <div key={i} className="value-item" style={{ padding: "2rem", borderTop: "2px solid var(--color-gold-dim)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "rgba(201,168,76,0.1)", fontWeight: 300, marginBottom: "0.5rem" }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "0.75rem" }}>{v.title}</h3>
                <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.875rem", lineHeight: 1.75 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad-sm" style={{ background: "var(--color-obsidian)", textAlign: "center" }}>
        <div className="container-main" style={{ maxWidth: "520px", margin: "0 auto" }}>
          <h2 className="display-md" style={{ color: "var(--color-platinum)", marginBottom: "1.25rem" }}>Ready to work <span className="gold-gradient">together?</span></h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary"><span>Get a Quote</span><ArrowRight size={14} /></Link>
            <Link href="/works" className="btn-ghost">See Our Work</Link>
          </div>
        </div>
      </section>
    </div>
  );
}