"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

const mockWorks = [
  { id: "1", title: "Johannesburg Jazz Festival", type: "Festival", location: "Johannesburg", date: "Mar 2024", status: "published" },
  { id: "2", title: "Discovery Vitality Gala", type: "Corporate", location: "Sandton", date: "Nov 2023", status: "published" },
  { id: "3", title: "Pinelands High School Musical", type: "School", location: "Cape Town", date: "Aug 2023", status: "published" },
];

export default function AdminWorks() {
  const [works, setWorks] = useState(mockWorks);
  return (
    <div style={{ padding: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-platinum)", fontWeight: 300 }}>Works & <span style={{ color: "var(--color-gold)" }}>Projects</span></h1>
          <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.82rem", marginTop: "0.25rem" }}>Manage your portfolio and case studies</p>
        </div>
        <Link href="/admin/works/new" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700 }}>
          <Plus size={15} /> Add Project
        </Link>
      </div>
      <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
            {["Project Title", "Type", "Location", "Date", "Status", "Actions"].map(h => <th key={h} style={{ padding: "1rem 1.25rem", textAlign: "left", fontSize: "0.68rem", color: "var(--color-gold-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {works.map((w, i) => (
              <tr key={w.id} style={{ borderBottom: i < works.length - 1 ? "1px solid rgba(201,168,76,0.06)" : "none" }}>
                <td style={{ padding: "1rem 1.25rem", fontSize: "0.85rem", color: "var(--color-platinum)", fontWeight: 500 }}>{w.title}</td>
                <td style={{ padding: "1rem 1.25rem" }}><span style={{ padding: "0.2rem 0.65rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "9999px", fontSize: "0.65rem", color: "var(--color-gold)" }}>{w.type}</span></td>
                <td style={{ padding: "1rem 1.25rem", fontSize: "0.78rem", color: "var(--color-platinum-dim)" }}>{w.location}</td>
                <td style={{ padding: "1rem 1.25rem", fontSize: "0.78rem", color: "var(--color-platinum-dim)" }}>{w.date}</td>
                <td style={{ padding: "1rem 1.25rem" }}><span style={{ padding: "0.2rem 0.65rem", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "9999px", fontSize: "0.65rem", color: "#22c55e" }}>{w.status}</span></td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link href={`/admin/works/${w.id}`} style={{ width: "32px", height: "32px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)", textDecoration: "none" }}><Edit size={14} /></Link>
                    <button onClick={() => { if (confirm("Delete?")) setWorks(ws => ws.filter(x => x.id !== w.id)); }} style={{ width: "32px", height: "32px", background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#e05050", cursor: "pointer" }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
