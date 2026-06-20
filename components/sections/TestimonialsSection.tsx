"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "Thabo Nkosi", role: "Event Director, Discovery Vitality", quote: "So Productions exceeded every expectation. The sound at our gala dinner was flawless — warm, clear, and perfectly balanced. Our guests couldn't stop commenting on it.", stars: 5 },
  { name: "Samantha Geldenhuys", role: "Head of Arts, Pinelands High", quote: "We've used So Productions for three consecutive years now. They know our venue better than we do, and the team is always professional, calm, and incredibly skilled.", stars: 5 },
  { name: "DJ Kairo", role: "Recording Artist", quote: "I needed guitar support and stage monitoring at short notice. They pulled it off without a single issue. Real professionals who understand what a live performer needs.", stars: 5 },
  { name: "Lindiwe Dube", role: "Marketing Manager, MTN", quote: "Our product launch required perfect audio timing with visuals. So Productions delivered seamlessly. Not once did sound become a problem — it just worked.", stars: 5 },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonial-section",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } }
      );
    }, ref);
    const timer = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => { ctx.revert(); clearInterval(timer); };
  }, []);

  const t = testimonials[active];

  return (
    <section ref={ref} className="section-pad" style={{ background: "var(--color-obsidian)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="container-main testimonial-section" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <p className="eyebrow" style={{ marginBottom: "1rem" }}>Client Stories</p>
        <h2 className="display-md" style={{ color: "var(--color-platinum)", marginBottom: "3rem" }}>
          What our clients <span className="gold-gradient">say</span>
        </h2>
        <div className="glass" style={{ padding: "3rem", position: "relative" }}>
          <div style={{ fontSize: "4rem", fontFamily: "var(--font-display)", color: "rgba(201,168,76,0.15)", lineHeight: 1, marginBottom: "1rem" }}>&ldquo;</div>
          <p style={{ fontSize: "1.1rem", color: "var(--color-platinum)", lineHeight: 1.8, fontStyle: "italic", fontFamily: "var(--font-display)", fontWeight: 300, marginBottom: "2rem" }}>{t.quote}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "1rem" }}>
            {Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={14} fill="var(--color-gold)" color="var(--color-gold)" />)}
          </div>
          <div style={{ fontWeight: 600, color: "var(--color-platinum)", fontSize: "0.9rem" }}>{t.name}</div>
          <div style={{ color: "var(--color-gold-dim)", fontSize: "0.78rem", marginTop: "0.25rem" }}>{t.role}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? "24px" : "8px", height: "8px", borderRadius: "9999px",
              background: i === active ? "var(--color-gold)" : "rgba(201,168,76,0.25)",
              border: "none", cursor: "pointer", transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
