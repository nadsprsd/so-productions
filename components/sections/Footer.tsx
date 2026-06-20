"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const services = [
  { label: "Sound Engineering", href: "/services/sound-engineering" },
  { label: "Music Production", href: "/services/music-production" },
  { label: "DJ Services", href: "/services/dj-services" },
  { label: "Stage Sound Systems", href: "/services/stage-sound" },
  { label: "School Event Sound", href: "/services/school-event-sound" },
  { label: "Guitar Support", href: "/services/guitar-support" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Work", href: "/works" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer
      style={{
        background: "var(--color-obsidian-light)",
        borderTop: "1px solid rgba(201,168,76,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-main" style={{ position: "relative" }}>
        {/* Top CTA strip */}
        <div
          style={{
            padding: "4rem 0",
            borderBottom: "1px solid rgba(201,168,76,0.08)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
              Ready to elevate your sound?
            </p>
            <h2
              className="display-md"
              style={{ color: "var(--color-platinum)", maxWidth: "480px" }}
            >
              Let&apos;s create something{" "}
              <span className="gold-gradient">extraordinary</span> together.
            </h2>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary">
              <span>Book a Session</span>
              <ArrowUpRight size={14} />
            </Link>
            <a
              href="https://wa.me/27000000000"
              className="btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Main footer grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            padding: "4rem 0",
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <FooterWaveform />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  color: "var(--color-platinum)",
                  fontWeight: 400,
                }}
              >
                So<span style={{ color: "var(--color-gold)" }}> Productions</span>
              </span>
            </div>
            <p
              style={{
                color: "var(--color-platinum-dim)",
                fontSize: "0.85rem",
                lineHeight: 1.7,
                maxWidth: "260px",
                marginBottom: "1.5rem",
              }}
            >
              Premium sound engineering and event production. We&apos;ve delivered 
              exceptional audio experiences across South Africa since 2018.
            </p>
            {/* Social */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { icon: <Instagram size={16} />, href: "#", label: "Instagram" },
                { icon: <Youtube size={16} />, href: "#", label: "YouTube" },
                { icon: <Facebook size={16} />, href: "#", label: "Facebook" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-gold-dim)",
                    transition: "all 0.25s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(201,168,76,0.15)";
                    el.style.color = "var(--color-gold)";
                    el.style.borderColor = "rgba(201,168,76,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(201,168,76,0.08)";
                    el.style.color = "var(--color-gold-dim)";
                    el.style.borderColor = "rgba(201,168,76,0.15)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="eyebrow"
              style={{ marginBottom: "1.25rem", color: "var(--color-gold)" }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    style={{
                      color: "var(--color-platinum-dim)",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--color-gold-light)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--color-platinum-dim)")
                    }
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="eyebrow"
              style={{ marginBottom: "1.25rem", color: "var(--color-gold)" }}
            >
              Company
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    style={{
                      color: "var(--color-platinum-dim)",
                      textDecoration: "none",
                      fontSize: "0.85rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--color-gold-light)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--color-platinum-dim)")
                    }
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="eyebrow"
              style={{ marginBottom: "1.25rem", color: "var(--color-gold)" }}
            >
              Get In Touch
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  icon: <Phone size={14} />,
                  text: "+27 (0) 00 000 0000",
                  href: "tel:+270000000000",
                },
                {
                  icon: <Mail size={14} />,
                  text: "hello@soproductions.co.za",
                  href: "mailto:hello@soproductions.co.za",
                },
                {
                  icon: <MapPin size={14} />,
                  text: "New Jersey & Philadelphia, USA",
                  href: "/locations",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.65rem",
                    color: "var(--color-platinum-dim)",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--color-gold-light)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--color-platinum-dim)";
                  }}
                >
                  <span style={{ color: "var(--color-gold)", marginTop: "2px", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {item.text}
                </a>
              ))}
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                padding: "0.85rem 1rem",
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.12)",
                borderRadius: "0.75rem",
              }}
            >
              <p className="eyebrow" style={{ fontSize: "0.6rem", marginBottom: "0.4rem" }}>
                Business Hours
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--color-platinum-dim)" }}>
                Mon – Fri: 8am – 6pm
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--color-platinum-dim)" }}>
                Sat: 9am – 3pm
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.08)",
            padding: "1.5rem 0",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          {/* 🛠️ FIXED: Structured side-by-side branding details layout */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem 1rem" }}>
            <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.78rem", margin: 0 }}>
              © {new Date().getFullYear()} So Productions. All rights reserved.
            </p>
            <span 
  className="hidden md:inline" // 🛠️ Use Tailwind classes instead of the 'md' style property
  style={{ color: "rgba(201,168,76,0.25)", fontSize: "0.75rem" }}
>
  |
</span>
            <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.78rem", margin: 0 }}>
              Developed by{" "}
              <a 
                href="https://www.bizgrowonline.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: "var(--color-gold-light)", 
                  textDecoration: "none", 
                  fontWeight: 500,
                  transition: "color 0.2s ease" 
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color = "var(--color-gold)"}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color = "var(--color-gold-light)"}
              >
                bizgrowonline
              </a>
            </p>
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: "var(--color-platinum-dim)",
                  fontSize: "0.78rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--color-gold)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--color-platinum-dim)")
                }
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterWaveform() {
  const bars = [4, 8, 12, 8, 4];
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 5}
          y={(16 - h) / 2}
          width="3"
          height={h}
          rx="1.5"
          fill="var(--color-gold-dim)"
        />
      ))}
    </svg>
  );
}