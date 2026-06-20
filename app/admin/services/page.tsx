"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Loader2, RefreshCw } from "lucide-react";

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } else {
        setError("Failed to fetch data from API route");
      }
    } catch (err) {
      setError("Network tracking error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchServices(); 
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this service?")) return;
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id })
    });
    if (res.ok) fetchServices();
  };

  if (loading) {
    return (
      <div style={{ padding: "2.5rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-platinum-dim)" }}>
        <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Loading system services...
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem" }}>
      {/* 🛠️ Fixed Header: Added the "New Service" Action Button right here */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-platinum)", fontWeight: 300, margin: 0 }}>
            Manage <span style={{ color: "var(--color-gold)" }}>Services</span>
          </h1>
          <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.82rem", marginTop: "0.25rem" }}>
            {services.length} total technical services active
          </p>
        </div>
        
        <Link href="/admin/services/new" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700 }}>
          <Plus size={15} /> New Service
        </Link>
      </div>

      {error && <p style={{ color: "#e05050", marginBottom: "1rem" }}>{error}</p>}
      
      {/* 🗂️ Content Grid Area */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {services.length === 0 ? (
          <div style={{ padding: "4rem 2rem", textAlign: "center", background: "var(--color-obsidian-light)", border: "1px dashed rgba(201,168,76,0.15)", borderRadius: "1rem" }}>
            <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Your local database tracking file is currently empty.
            </p>
            <Link href="/admin/services/new" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", border: "1px solid var(--color-gold)", color: "var(--color-gold)", borderRadius: "9999px", textDecoration: "none", fontSize: "0.8rem" }}>
              <Plus size={14} /> Add Your First Service
            </Link>
          </div>
        ) : (
          services.map(s => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem" }}>
              <div style={{ maxWidth: "80%" }}>
                <span style={{ fontSize: "0.95rem", color: "var(--color-platinum)", fontWeight: 500 }}>{s.title}</span>
                <p style={{ fontSize: "0.78rem", color: "var(--color-platinum-dim)", marginTop: "0.3rem", lineHeight: 1.4 }}>{s.excerpt}</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Link href={`/admin/services/${s.id}`} style={{ width: "32px", height: "32px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)" }}>
                  <Edit size={14} />
                </Link>
                <button onClick={() => handleDelete(s.id)} style={{ width: "32px", height: "32px", background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Trash2 size={14} color="#e05050" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}