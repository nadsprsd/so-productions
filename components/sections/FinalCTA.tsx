"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="section-pad" style={{ background: "var(--color-obsidian)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="container-main" style={{ textAlign: "center", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "2.5rem", height: "48px", alignItems: "flex-end" }}>
          {[5,9,14,18,14,9,5,9,14,9,5].map((h, i) => (
            <div key={i} style={{ width: "3px", height: `${h}px`, background: "linear-gradient(to top, var(--color-gold-dim), var(--color-gold))", borderRadius: "2px" }} />
          ))}
        </div>
        <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>Ready When You Are</p>
        <h2 className="display-lg" style={{ color: "var(--color-platinum)", marginBottom: "1.25rem" }}>
          Let&apos;s make your event<br /><span className="gold-gradient">sound extraordinary.</span>
        </h2>
        <p style={{ color: "var(--color-platinum-dim)", maxWidth: "480px", margin: "0 auto 3rem", fontSize: "0.95rem", lineHeight: 1.75 }}>
          Whether you&apos;re planning a school production or a national festival, we bring the same care, expertise, and commitment to every brief.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="btn-primary">
            <span>Book a Consultation</span><ArrowRight size={16} />
          </Link>
          <a href="https://wa.me/27000000000" className="btn-ghost" target="_blank" rel="noopener noreferrer">
            WhatsApp Us Directly
          </a>
        </div>
      </div>
    </section>
  );
}
