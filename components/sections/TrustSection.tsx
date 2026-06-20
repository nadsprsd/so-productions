"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 6, suffix: "+", label: "Years in the industry" },
  { value: 400, suffix: "+", label: "Events produced" },
  { value: 50, suffix: "+", label: "Happy clients" },
  { value: 12, suffix: "", label: "Awards & recognition" },
];

export function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section cards in
      gsap.fromTo(
        ".trust-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Counter animation
      document.querySelectorAll(".stat-counter").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0", 10);
        
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            // ✅ FIXED FOR THE NEW CODEBASE: Animate raw object values with gsap.to()
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: function () {
                el.textContent = Math.round(obj.val).toString();
              },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-obsidian-light)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Contact strip */}
      <div
        style={{
          background: "var(--color-obsidian-mid)",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
          padding: "1.25rem 0",
        }}
      >
        <div
          className="container-main"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.82rem" }}>
            Got questions? We&apos;re here to help.
          </p>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <a
              href="tel:+270000000000"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--color-gold)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              <Phone size={14} />
              +27 (0) 00 000 0000
            </a>
            <a
              href="mailto:hello@soproductions.co.za"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--color-gold)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              <Mail size={14} />
              hello@soproductions.co.za
            </a>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="container-main section-pad-sm">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1px",
            background: "rgba(201,168,76,0.08)",
            border: "1px solid rgba(201,168,76,0.08)",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="trust-card"
              style={{
                padding: "2.5rem 2rem",
                background: "var(--color-obsidian-light)",
                textAlign: "center",
                opacity: 0,
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  color: "var(--color-gold)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <span className="stat-counter" data-target={stat.value}>
                  0
                </span>
                <span>{stat.suffix}</span>
              </div>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--color-platinum-dim)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}