"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Calendar, Tag, Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PublicWorkDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjectDetails() {
      try {
        // Query our unified local works backend route
        const res = await fetch("/api/admin/works");
        if (res.ok) {
          const allWorks = await res.json();
          // Find the matching project by ID string or numerical fallback
          const match = allWorks.find((w: any) => w.id === id || w._id === id);
          setWork(match || null);
        }
      } catch (err) {
        console.error("Error reading portfolio details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjectDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "12rem 2rem", background: "var(--color-obsidian)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "var(--color-platinum-dim)" }}>
        <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> Loading Project Case Study...
      </div>
    );
  }

  if (!work) {
    return (
      <div style={{ padding: "12rem 2rem", background: "var(--color-obsidian)", minHeight: "100vh", textAlign: "center", color: "var(--color-platinum)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1rem" }}>Project Not Found</h1>
        <Link href="/works" style={{ color: "var(--color-gold)", textDecoration: "none" }}>← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--color-obsidian)", minHeight: "100vh", color: "var(--color-platinum)", paddingTop: "8rem" }}>
      <div className="container-main" style={{ maxWidth: "1000px", padding: "2rem 1.5rem 6rem" }}>
        
        <Link href="/works" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-gold)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
          <ArrowLeft size={14} /> Back to All Projects
        </Link>

        {/* 📸 Project Hero Image Banner */}
        <div style={{ position: "relative", width: "100%", height: "450px", borderRadius: "1.25rem", overflow: "hidden", marginBottom: "3.5rem", border: "1px solid rgba(201,168,76,0.15)" }}>
          <Image 
            src={work.image || "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=80"} 
            alt={work.title} 
            fill 
            style={{ objectFit: "cover" }} 
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #080808, transparent)" }} />
        </div>

        {/* Project Header details */}
        <div style={{ marginBottom: "3rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>{work.type || "Production Showcase"}</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 300, marginBottom: "1.5rem", lineHeight: 1.2 }}>
            {work.title}
          </h1>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)", padding: "1.25rem 0" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--color-platinum-dim)" }}>
              <MapPin size={14} color="var(--color-gold)" /> {work.location}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--color-platinum-dim)" }}>
              <Calendar size={14} color="var(--color-gold)" /> {work.date}
            </span>
          </div>
        </div>

        {/* 📝 Main Case Study Insights Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.08)", borderRadius: "1rem", padding: "2.5rem" }}>
            <h3 style={{ color: "var(--color-gold)", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem", fontFamily: "var(--font-body)", fontWeight: 600 }}>
              Project Overview / Challenge
            </h3>
            <p style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", margin: 0, whiteSpace: "pre-wrap" }}>
              {work.challenge || work.description || "No project overview description provided."}
            </p>
          </div>

          {work.solution && (
            <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.08)", borderRadius: "1rem", padding: "2.5rem" }}>
              <h3 style={{ color: "var(--color-gold)", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem", fontWeight: 600 }}>
                Our Technical Solution
              </h3>
              <p style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", margin: 0, whiteSpace: "pre-wrap" }}>
                {work.solution}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}