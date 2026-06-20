"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/works", label: "Works" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: isMobile ? "0.75rem" : "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: isMobile ? "calc(100% - 1.5rem)" : scrolled ? "calc(100% - 3rem)" : "calc(100% - 2rem)",
          maxWidth: isMobile ? "100%" : scrolled ? "1100px" : "1280px", // 🛠️ FIXED: Removed the 440px crushing mobile block limit
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // 🛠️ FIXED: Minimal layout margins on phone views to match your design perfectly
            padding: isMobile ? "0.5rem 1rem" : scrolled ? "0.85rem 2rem" : "1.1rem 2.5rem",
            background: isMobile 
              ? (menuOpen ? "rgba(8,8,8,0.98)" : "rgba(8,8,8,0.15)") // 🛠️ FIXED: Reduced active transparent alpha context
              : (scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0.55)"),
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: isMobile && menuOpen ? "1rem 1rem 0 0" : "9999px",
            border: isMobile ? "1px solid rgba(201,168,76,0.08)" : "1px solid rgba(201,168,76,0.15)",
            boxShadow: scrolled ? "0 20px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.15)",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {/* Logo Frame */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              textDecoration: "none",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            <WaveformLogo />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isMobile ? "0.85rem" : "1.15rem",
                fontWeight: 500,
                color: "var(--color-platinum)",
                letterSpacing: "0.02em",
              }}
            >
              So<span style={{ color: "var(--color-gold)" }}> Productions</span>
            </span>
          </Link>

          {/* Desktop Links Row */}
          {!isMobile && (
            <ul style={{ display: "flex", alignItems: "center", gap: "0.25rem", listStyle: "none", margin: 0, padding: 0 }}>
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        display: "block",
                        padding: "0.45rem 0.9rem",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: active ? "var(--color-gold)" : "var(--color-platinum-dim)",
                        textDecoration: "none",
                        borderRadius: "9999px",
                        background: active ? "rgba(201,168,76,0.1)" : "transparent",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Hamburger Trigger Button */}
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            {!isMobile && (
              <Link href="/contact" className="btn-primary" style={{ padding: "0.65rem 1.5rem", fontSize: "0.7rem" }}>
                <span>Book Now</span>
              </Link>
            )}

            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  background: "rgba(201,168,76,0.03)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--color-gold)",
                  outline: "none",
                }}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={14} /> : <Menu size={14} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Options Map Drawer */}
        {isMobile && menuOpen && (
          <div
            style={{
              background: "rgba(8,8,8,0.98)",
              backdropFilter: "blur(20px)",
              borderRadius: "0 0 1rem 1rem",
              borderWidth: "0 1px 1px 1px",
              borderStyle: "solid",
              borderColor: "rgba(201,168,76,0.08)",
              padding: "0.75rem 1.25rem 1.25rem",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.href} style={{ borderBottom: "1px solid rgba(201,168,76,0.04)" }}>
                  <Link
                    href={link.href}
                    style={{
                      display: "block",
                      padding: "0.65rem 0.1rem",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: pathname === link.href ? "var(--color-gold)" : "var(--color-platinum-dim)",
                      textDecoration: "none",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="btn-primary"
              style={{ marginTop: "1rem", width: "100%", justifyContent: "center", padding: "0.65rem", fontSize: "0.75rem" }}
            >
              <span>Book Your Event</span>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

function WaveformLogo() {
  const bars = [4, 7, 10, 14, 10, 7, 4, 7, 10, 7];
  return (
    <svg width="18" height="14" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      {bars.map((h, i) => (
        <rect key={i} x={i * 3.2} y={(20 - h) / 2} width="2.2" height={h} rx="1.1" fill="url(#navWaveGrad)" />
      ))}
      <defs>
        <linearGradient id="navWaveGrad" x1="0" y1="0" x2="0" y2="20">
          <stop offset="0%" stopColor="#e2c27d" />
          <stop offset="100%" stopColor="#8a6f32" />
        </linearGradient>
      </defs>
    </svg>
  );
}