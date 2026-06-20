"use client";
import { useState } from "react";
import { Save } from "lucide-react";

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ businessName: "So Productions", phone: "+1 (000) 000-0000", email: "hello@soproductions.co.za", whatsapp: "+1 (000) 000-0000", address: "New Jersey & Philadelphia, USA", instagram: "", facebook: "", youtube: "" });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const handleSave = async () => { await new Promise(r => setTimeout(r, 600)); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const inp = { width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.6rem", color: "var(--color-platinum)", fontSize: "0.875rem", outline: "none", fontFamily: "var(--font-body)" };
  const lbl = { display: "block" as const, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--color-gold-dim)", marginBottom: "0.5rem" };

  return (
    <div style={{ padding: "2.5rem", maxWidth: "700px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-platinum)", fontWeight: 300 }}>Site <span style={{ color: "var(--color-gold)" }}>Settings</span></h1>
        <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.82rem", marginTop: "0.25rem" }}>Update your business contact details</p>
      </div>

      {[
        { title: "Business Details", fields: [
          { key: "businessName", label: "Business Name" },
          { key: "phone", label: "Phone Number" },
          { key: "email", label: "Email Address" },
          { key: "whatsapp", label: "WhatsApp Number (digits only, e.g. 27821234567)" },
          { key: "address", label: "Address / Service Area" },
        ]},
        { title: "Social Media", fields: [
          { key: "instagram", label: "Instagram URL" },
          { key: "facebook", label: "Facebook URL" },
          { key: "youtube", label: "YouTube URL" },
        ]},
      ].map((section, si) => (
        <div key={si} style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", padding: "1.75rem", marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.78rem", color: "var(--color-gold)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>{section.title}</p>
          {section.fields.map(field => (
            <div key={field.key} style={{ marginBottom: "1.25rem" }}>
              <label style={lbl}>{field.label}</label>
              <input value={(form as Record<string,string>)[field.key]} onChange={e => set(field.key, e.target.value)} style={inp} />
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 2rem", background: saved ? "#22c55e" : "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em" }}>
        <Save size={15} /> {saved ? "Saved! ✓" : "Save Settings"}
      </button>
    </div>
  );
}
