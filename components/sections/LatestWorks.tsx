"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: string;
  title: string;
  type: string;
  location: string;
  date: string;
  challenge?: string;
  description?: string;
  tags?: string[];
  image?: string;
}

const fallbackWorks: WorkItem[] = [
  {
    id: "1",
    title: "Johannesburg Jazz Festival",
    type: "Festival Sound", location: "Johannesburg, GP", date: "March 2024",
    challenge: "Full line array deployment with 8 satellite PA points and a 96-channel FOH console for a 3,500-capacity outdoor festival.",
    tags: ["Line Array", "FOH", "Outdoor"],
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=900&q=75",
  },
  {
    id: "2",
    title: "Corporate Gala — Discovery Vitality",
    type: "Corporate Event", location: "Sandton Convention Centre", date: "November 2023",
    challenge: "Elegant audio for 800-person gala dinner with live band support and video playback.",
    tags: ["Corporate", "Live Band", "Indoor"],
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=700&q=75",
  },
  {
    id: "3",
    title: "Pinelands High School Musical",
    type: "School Event", location: "Cape Town, WC", date: "August 2023",
    challenge: "Full PA, stage monitors, and wireless mic system for three-night school musical production.",
    tags: ["School", "Theatre", "Wireless"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=75",
  }
];

export function LatestWorks() {
  const ref = useRef<HTMLElement>(null);
  const [dbWorks, setDbWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1200); // 🛠️ Safety default prevents Next.js SSR layout parsing failures

  useEffect(() => {
    // Sync actual screen metrics on clean client initialization
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    async function loadWorks() {
      try {
        const res = await fetch("/api/admin/works");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setDbWorks(data.length > 0 ? data : fallbackWorks);
      } catch (err) {
        console.error("Failed to read portfolio database track:", err);
        setDbWorks(fallbackWorks);
      } finally {
        setLoading(false);
      }
    }
    loadWorks();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (loading || dbWorks.length === 0) return;
    
    // 🛠️ Controlled context container forces precise trigger targeting even after hot-reloads
    const ctx = gsap.context(() => {
      gsap.fromTo(".work-card", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [loading, dbWorks]);

  if (loading || dbWorks.length === 0 || !dbWorks[0]) {
    return (
      <div style={{ padding: "5rem 2rem", background: "var(--color-obsidian-light)", color: "var(--color-platinum-dim)", textAlign: "center" }}>
        Loading project showcase profiles...
      </div>
    );
  }

  const featured = dbWorks[0];
  const secondaryWorks = dbWorks.slice(1, 3);
  const isMobile = windowWidth < 768;

  return (
    <section ref={ref} className="section-pad" style={{ background: "var(--color-obsidian-light)" }}>
      <div className="container-main" style={{ padding: isMobile ? "0 1rem" : "0 2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", marginBottom: "2.5rem" }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Proof of Work</p>
            <h2 className="display-lg" style={{ color: "var(--color-platinum)", fontSize: isMobile ? "1.75rem" : "2.5rem" }}>Recent <span className="gold-gradient">projects</span></h2>
          </div>
          <Link href="/works" className="btn-ghost" style={{ fontSize: "0.8rem" }}>All Projects <ArrowRight size={14} /></Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Featured element */}
          <Link 
            href={`/works/${featured.id}`} 
            className="work-card glass" 
            style={{ 
              display: "grid", 
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // 🛠️ FIXED: Stacks vertically on mobile to prevent crushing strings
              gap: "0", 
              opacity: 0, 
              textDecoration: "none", 
              borderRadius: "1.25rem", 
              overflow: "hidden" 
            }}
          >
            <div style={{ position: "relative", minHeight: isMobile ? "200px" : "280px" }}>
              <Image 
                src={featured.image || "https://images.unsplash.com/photo-1501612780327-45045538702b?w=900&q=75"} 
                alt={featured.title} 
                fill 
                style={{ objectFit: "cover" }} 
                sizes="(max-width: 768px) 100vw, 50vw" 
              />
              <div style={{ position: "absolute", inset: 0, background: isMobile ? "linear-gradient(to bottom, transparent, rgba(8,8,8,0.5))" : "linear-gradient(to right, transparent, rgba(8,8,8,0.3))" }} />
            </div>
            <div style={{ padding: isMobile ? "1.5rem" : "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                {(featured.tags || ["Production"]).map(tag => (
                  <span key={tag} style={{ padding: "0.15rem 0.55rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "9999px", fontSize: "0.62rem", color: "var(--color-gold-dim)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? "1.35rem" : "1.6rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "0.75rem" }}>{featured.title}</h3>
              <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                {featured.challenge || featured.description}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--color-platinum-dim)" }}><MapPin size={12} color="var(--color-gold-dim)" />{featured.location}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--color-platinum-dim)" }}><Calendar size={12} color="var(--color-gold-dim)" />{featured.date}</span>
              </div>
            </div>
          </Link>

          {/* Subgrid elements */}
          {secondaryWorks.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.5rem" }}>
              {secondaryWorks.map((work) => (
                <Link key={work.id} href={`/works/${work.id}`} className="work-card glass" style={{ display: "block", opacity: 0, textDecoration: "none", borderRadius: "1rem", overflow: "hidden" }}>
                  <div style={{ position: "relative", aspectRatio: "16/9" }}>
                    <Image 
                      src={work.image || "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=700&q=75"} 
                      alt={work.title} 
                      fill 
                      style={{ objectFit: "cover" }} 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                    />
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.65rem", flexWrap: "wrap" }}>
                      {(work.tags || ["Production"]).map(tag => (
                        <span key={tag} style={{ padding: "0.15rem 0.55rem", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "9999px", fontSize: "0.62rem", color: "var(--color-gold-dim)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "0.5rem" }}>{work.title}</h3>
                    <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.8rem", lineHeight: 1.6 }}>
                      {work.challenge || work.description}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "1rem", color: "var(--color-gold)", fontSize: "0.75rem" }}>
                      View case study <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}