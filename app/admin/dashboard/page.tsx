"use client";

import { FileText, Briefcase, Camera, Star, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
  { label: "Blog Posts", value: "4", sub: "2 published", icon: FileText, color: "#c9a84c" },
  { label: "Works / Projects", value: "6", sub: "6 live", icon: Briefcase, color: "#c9a84c" },
  { label: "Gallery Items", value: "12", sub: "12 active", icon: Camera, color: "#c9a84c" },
  { label: "Testimonials", value: "4", sub: "4 showing", icon: Star, color: "#c9a84c" },
  { label: "New Enquiries", value: "0", sub: "Check inbox", icon: MessageSquare, color: "#e05050" },
  { label: "Site Status", value: "Live", sub: "All systems go", icon: TrendingUp, color: "#22c55e" },
];

const quickLinks = [
  { label: "Write New Blog Post", href: "/admin/blog/new", desc: "Publish an article or tip" },
  { label: "Add a Project", href: "/admin/works/new", desc: "Add a new case study" },
  { label: "Upload Gallery Photo", href: "/admin/gallery/new", desc: "Add image or video" },
  { label: "Add Testimonial", href: "/admin/testimonials/new", desc: "Add a client review" },
];

export default function AdminDashboard() {
  return (
    <div style={{ padding: "2.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--color-platinum)", fontWeight: 300, marginBottom: "0.4rem" }}>
          Welcome back <span style={{ color: "var(--color-gold)" }}>Admin</span>
        </h1>
        <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.875rem" }}>Here&apos;s an overview of your So Productions website.</p>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} style={{ padding: "1.5rem", background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div style={{ width: "38px", height: "38px", background: "rgba(201,168,76,0.08)", borderRadius: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color={stat.color} />
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: stat.color, fontWeight: 300, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-platinum)", fontWeight: 500, marginTop: "0.3rem" }}>{stat.label}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-platinum-dim)", marginTop: "0.2rem" }}>{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "1rem" }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {quickLinks.map((link, i) => (
            <a key={i} href={link.href} style={{ display: "block", padding: "1.25rem", background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(201,168,76,0.35)"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "rgba(201,168,76,0.1)"; el.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "0.85rem", color: "var(--color-gold)", fontWeight: 600, marginBottom: "0.3rem" }}>+ {link.label}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-platinum-dim)" }}>{link.desc}</div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}