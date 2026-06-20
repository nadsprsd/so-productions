"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Music, Headphones, Disc3, Speaker, GraduationCap, Guitar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: <Headphones size={28} />,
    title: "Sound Engineering",
    description:
      "Live mixing, monitor engineering, and FOH sound for concerts, conferences, and events of every scale.",
    href: "/services/sound-engineering",
    tags: ["Live Mix", "FOH", "Monitors"],
  },
  {
    icon: <Music size={28} />,
    title: "Music Production",
    description:
      "Full-service music production — from initial concept and arrangement through tracking, mixing, and mastering.",
    href: "/services/music-production",
    tags: ["Recording", "Mixing", "Mastering"],
  },
  {
    icon: <Disc3 size={28} />,
    title: "DJ Services",
    description:
      "Professional DJ performance for corporate events, weddings, club nights, and private celebrations.",
    href: "/services/dj-services",
    tags: ["Corporate", "Weddings", "Club"],
  },
  {
    icon: <Speaker size={28} />,
    title: "Stage Sound Systems",
    description:
      "Line array design, sub configurations, delay stacks, and full PA deployment for large-scale events.",
    href: "/services/stage-sound",
    tags: ["Line Array", "PA Systems", "Festival"],
  },
  {
    icon: <GraduationCap size={28} />,
    title: "School Event Sound",
    description:
      "Reliable, budget-conscious audio solutions for matric balls, prize-givings, concerts, and school productions.",
    href: "/services/school-event-sound",
    tags: ["Schools", "Budget-Friendly", "Reliable"],
  },
  {
    icon: <Guitar size={28} />,
    title: "Guitar Support",
    description:
      "Amp tech, pedalboard routing, in-ear monitoring, and live guitar support for professional performers.",
    href: "/services/guitar-support",
    tags: ["Amp Tech", "IEM", "Live Support"],
  },
];

export function ServicesOverview() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-pad" style={{ background: "var(--color-obsidian)" }}>
      <div className="container-main">
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "2rem",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>
              What We Do
            </p>
            <h2 className="display-lg" style={{ color: "var(--color-platinum)" }}>
              Our{" "}
              <span className="gold-gradient">services</span>
            </h2>
          </div>
          <Link href="/services" className="btn-ghost">
            All Services
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Services grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
            gap: "1.5px",
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.06)",
            borderRadius: "1.25rem",
            overflow: "hidden",
          }}
        >
          {services.map((svc, i) => (
            <Link
              key={i}
              href={svc.href}
              className="svc-card"
              style={{
                display: "block",
                padding: "2.5rem",
                background: "var(--color-obsidian)",
                textDecoration: "none",
                opacity: 0,
                transition: "background 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--color-obsidian-mid)";
                const arrow = el.querySelector(".svc-arrow") as HTMLElement;
                if (arrow) {
                  arrow.style.transform = "translate(3px, -3px)";
                  arrow.style.opacity = "1";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--color-obsidian)";
                const arrow = el.querySelector(".svc-arrow") as HTMLElement;
                if (arrow) {
                  arrow.style.transform = "translate(0, 0)";
                  arrow.style.opacity = "0.4";
                }
              }}
            >
              {/* Number */}
              <span
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  color: "rgba(201,168,76,0.06)",
                  fontWeight: 300,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-gold)",
                  marginBottom: "1.5rem",
                }}
              >
                {svc.icon}
              </div>

              {/* Title + arrow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "0.85rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    color: "var(--color-platinum)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  {svc.title}
                </h3>
                <ArrowRight
                  className="svc-arrow"
                  size={18}
                  style={{
                    color: "var(--color-gold)",
                    opacity: 0.4,
                    transition: "all 0.25s ease",
                    flexShrink: 0,
                    marginLeft: "0.5rem",
                    marginTop: "0.2rem",
                  }}
                />
              </div>

              <p
                style={{
                  color: "var(--color-platinum-dim)",
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                }}
              >
                {svc.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "0.25rem 0.75rem",
                      background: "rgba(201,168,76,0.06)",
                      border: "1px solid rgba(201,168,76,0.12)",
                      borderRadius: "9999px",
                      fontSize: "0.68rem",
                      color: "var(--color-gold-dim)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
