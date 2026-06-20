"use client";
import { useState } from "react";
import { Mail, Phone, Calendar, CheckCircle } from "lucide-react";

const mockContacts = [
  { id: "1", name: "Sipho Dlamini", email: "sipho@example.com", phone: "082 000 0001", eventType: "Corporate Event", eventDate: "2024-08-15", message: "We need sound for a 500-person year-end function at a venue in Sandton. Please send a quote.", status: "new", date: "19 Jun 2024" },
  { id: "2", name: "Anita Botha", email: "anita@school.co.za", phone: "083 000 0002", eventType: "School Event", eventDate: "2024-07-20", message: "Annual prize-giving for 300 students. Need wireless mics and a PA system.", status: "read", date: "17 Jun 2024" },
  { id: "3", name: "Marcus Joubert", email: "marcus@events.co.za", phone: "071 000 0003", eventType: "Festival / Concert", eventDate: "2024-09-01", message: "Multi-stage outdoor music event. Looking for full production package.", status: "replied", date: "14 Jun 2024" },
];

export default function AdminContacts() {
  const [contacts, setContacts] = useState(mockContacts);
  const [selected, setSelected] = useState<typeof mockContacts[0] | null>(null);

  const statusColor: Record<string, string> = { new: "#e05050", read: "var(--color-gold)", replied: "#22c55e" };

  const markAs = (id: string, status: string) => {
    setContacts(cs => cs.map(c => c.id === id ? { ...c, status } : c));
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : null);
  };

  return (
    <div style={{ padding: "2.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-platinum)", fontWeight: 300 }}>Contact <span style={{ color: "var(--color-gold)" }}>Enquiries</span></h1>
        <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.82rem", marginTop: "0.25rem" }}>{contacts.filter(c => c.status === "new").length} new · {contacts.length} total</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {contacts.map(c => (
            <div key={c.id} onClick={() => { setSelected(c); markAs(c.id, c.status === "new" ? "read" : c.status); }}
              style={{ padding: "1.25rem 1.5rem", background: selected?.id === c.id ? "rgba(201,168,76,0.08)" : "var(--color-obsidian-light)", border: `1px solid ${selected?.id === c.id ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.1)"}`, borderRadius: "0.85rem", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.88rem", color: "var(--color-platinum)", fontWeight: 600 }}>{c.name}</span>
                <span style={{ padding: "0.15rem 0.55rem", background: `${statusColor[c.status]}20`, border: `1px solid ${statusColor[c.status]}40`, borderRadius: "9999px", fontSize: "0.62rem", color: statusColor[c.status], textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.status}</span>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--color-gold-dim)", marginBottom: "0.4rem" }}>{c.eventType} · {c.date}</p>
              <p style={{ fontSize: "0.78rem", color: "var(--color-platinum-dim)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{c.message}</p>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.85rem", padding: "1.75rem", position: "sticky", top: "2rem", alignSelf: "start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--color-platinum)", fontWeight: 400 }}>{selected.name}</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "var(--color-platinum-dim)", cursor: "pointer", fontSize: "1.2rem" }}>×</button>
            </div>
            {[{ icon: <Mail size={14} />, text: selected.email }, { icon: <Phone size={14} />, text: selected.phone }, { icon: <Calendar size={14} />, text: `${selected.eventType} · ${selected.eventDate}` }].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem", color: "var(--color-platinum-dim)", fontSize: "0.82rem" }}>
                <span style={{ color: "var(--color-gold)" }}>{item.icon}</span>{item.text}
              </div>
            ))}
            <div style={{ margin: "1.25rem 0", padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "0.6rem", border: "1px solid rgba(201,168,76,0.08)" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--color-platinum)", lineHeight: 1.7 }}>{selected.message}</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={`mailto:${selected.email}`} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.7rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", textDecoration: "none", fontSize: "0.75rem", fontWeight: 700 }}>
                <Mail size={13} /> Reply by Email
              </a>
              <button onClick={() => markAs(selected.id, "replied")} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.7rem", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", borderRadius: "9999px", cursor: "pointer", fontSize: "0.75rem" }}>
                <CheckCircle size={13} /> Mark Replied
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
