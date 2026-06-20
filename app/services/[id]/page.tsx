"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServiceData() {
      try {
        // Fetch from our local API engine route using query selection parameters
        const res = await fetch(`/api/admin/services?id=${id}`);
        if (res.ok) {
          setService(await res.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadServiceData();
  }, [id]);

  if (loading) return <div style={{ padding: "12rem 2rem", background: "var(--color-obsidian)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-platinum-dim)" }}><Loader2 size={20} className="animate-spin" /> Loading setup configurations...</div>;
  
  if (!service) return <div style={{ padding: "12rem 2rem", background: "var(--color-obsidian)", minHeight: "100vh", color: "var(--color-platinum)", textAlignment: "center" }}><h2>Service parameters not found.</h2><Link href="/services" style={{ color: "var(--color-gold)" }}>Return to portfolio services overview</Link></div>;

  return (
    <div style={{ background: "var(--color-obsidian)", minHeight: "100vh", color: "var(--color-platinum)", paddingTop: "8rem" }}>
      <div className="container-main" style={{ maxWidth: "1000px", padding: "2rem 1.5rem 6rem" }}>
        
        <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-gold)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
          <ArrowLeft size={14} /> Back to Services Overview
        </Link>

        {/* 📸 Dynamic Cover Image Banner */}
        {service.image && (
          <div style={{ position: "relative", width: "100%", height: "400px", borderRadius: "1.25rem", overflow: "hidden", marginBottom: "3.5rem", border: "1px solid rgba(201,168,76,0.15)" }}>
            <Image 
              src={service.image} 
              alt={service.title} 
              fill 
              style={{ objectFit: "cover" }} 
              priority
              sizes="100vw"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #080808, transparent)" }} />
          </div>
        )}

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.8rem", fontWeight: 300, marginBottom: "1rem" }}>
          {service.title}
        </h1>
        
        <p style={{ fontSize: "1.1rem", color: "var(--color-gold-dim)", marginBottom: "3rem", maxWidth: "700px", lineHeight: 1.6 }}>
          {service.excerpt}
        </p>

        <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.08)", borderRadius: "1rem", padding: "2.5rem", lineHeight: 1.8, fontSize: "1.05rem", color: "rgba(255,255,255,0.8)" }}>
          <h3 style={{ color: "var(--color-platinum)", fontSize: "1.3rem", fontWeight: 400, marginBottom: "1.25rem", fontFamily: "var(--font-display)" }}>Operational Scope</h3>
          <div style={{ whiteSpace: "pre-wrap" }}>{service.description}</div>
        </div>

      </div>
    </div>
  );
}