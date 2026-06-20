"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Headphones, Zap, Shield, Clock, Users, Star } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: <Headphones size={24} />, title: "Studio-Grade Sound", description: "We use professional-grade equipment from leading audio manufacturers. Your event deserves the same quality that Grammy-winning artists record with." },
  { icon: <Zap size={24} />, title: "Setup in Record Time", description: "We show up early and work fast. Our team has the setup process down to a science, so you're never left worrying about delays on the day." },
  { icon: <Shield size={24} />, title: "Backup Equipment On-Site", description: "We never show up without redundancy. Spare equipment travels with every crew, because a technical failure at your event simply isn't an option." },
  { icon: <Clock size={24} />, title: "Available Evenings & Weekends", description: "Events don't follow a 9-to-5 schedule, and neither do we. We're available when you need us — school functions, corporate nights, weekend shows." },
  { icon: <Users size={24} />, title: "Client-First Always", description: "We treat every brief like it matters — because it does. Expect clear communication, honest advice, and a team that genuinely cares about your outcome." },
  { icon: <Star size={24} />, title: "Proven Track Record", description: "Over 400 events. Hundreds of satisfied clients. Our reputation is built on repeat bookings and word-of-mouth — the only metric that truly counts." },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".why-heading", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      gsap.fromTo(".why-card", { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ".why-grid", start: "top 75%" } });
      gsap.utils.toArray<HTMLElement>(".why-icon").forEach((icon) => {
        ScrollTrigger.create({ trigger: icon, start: "top 85%", once: true, onEnter: () => gsap.fromTo(icon, { scale: 0, rotation: -20 }, { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" }) });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-pad" style={{ background: "var(--color-obsidian-light)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="container-main">
        <div className="why-heading" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Why So Productions</p>
          <h2 className="display-lg" style={{ color: "var(--color-platinum)" }}>Sound you can <span className="gold-gradient">trust</span></h2>
          <p style={{ color: "var(--color-platinum-dim)", maxWidth: "520px", margin: "1.25rem auto 0", fontSize: "0.95rem", lineHeight: 1.75 }}>When your moment matters, you need a team that won&apos;t let you down.</p>
        </div>
        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {features.map((feat, i) => (
            <div key={i} className="why-card glass" style={{ padding: "2rem", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s", cursor: "default" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.35)"; el.style.boxShadow = "0 20px 60px rgba(201,168,76,0.12)"; el.style.transform = "translateY(-6px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.12)"; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
            >
              <div className="why-icon" style={{ width: "52px", height: "52px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)", marginBottom: "1.25rem" }}>{feat.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-platinum)", marginBottom: "0.75rem", fontWeight: 400 }}>{feat.title}</h3>
              <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.875rem", lineHeight: 1.75 }}>{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
