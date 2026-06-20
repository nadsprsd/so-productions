"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Briefcase, Camera, Star, MapPin, MessageSquare, Settings, LogOut, ChevronRight, Headphones, Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Works / Projects", href: "/admin/works", icon: Briefcase },
  { label: "Services", href: "/admin/services", icon: Headphones },
  { label: "Gallery", href: "/admin/gallery", icon: Camera },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Locations", href: "/admin/locations", icon: MapPin },
  { label: "Contact Enquiries", href: "/admin/contacts", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  
  if (pathname === "/admin/login") {
    return null;
  }
      
  

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    // Force a fresh reload target to make sure layout states drop
    window.location.replace("/admin/login");
  };

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: "100vh" }}>
      <div style={{ padding: "1.75rem 1.5rem", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", borderRadius: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Headphones size={18} color="#080808" />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", color: "var(--color-platinum)" }}>So Productions</div>
            <div style={{ fontSize: "0.58rem", color: "var(--color-gold-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin Panel</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "1rem 0.75rem", overflowY: "auto" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 0.75rem", borderRadius: "0.6rem", marginBottom: "0.25rem", textDecoration: "none", transition: "all 0.2s ease", background: active ? "rgba(201,168,76,0.12)" : "transparent", color: active ? "var(--color-gold)" : "var(--color-platinum-dim)", borderLeft: active ? "2px solid var(--color-gold)" : "2px solid transparent" }}
              onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(201,168,76,0.06)"; el.style.color = "var(--color-platinum)"; } }}
              onMouseLeave={e => { if (!active) { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "var(--color-platinum-dim)"; } }}
            >
              <Icon size={17} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: "0.82rem", fontWeight: active ? 600 : 400 }}>{item.label}</span>
              {active && <ChevronRight size={13} style={{ marginLeft: "auto" }} />}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.65rem", borderRadius: "0.6rem", textDecoration: "none", color: "var(--color-platinum-dim)", fontSize: "0.78rem", marginBottom: "0.5rem", border: "1px solid rgba(201,168,76,0.12)" }}>
          View Live Site ↗
        </a>
        <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.65rem", borderRadius: "0.6rem", width: "100%", background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.15)", color: "#e05050", fontSize: "0.78rem", cursor: "pointer" }}>
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside style={{ width: "240px", minHeight: "100vh", background: "var(--color-obsidian-light)", borderRight: "1px solid rgba(201,168,76,0.1)", position: "fixed", left: 0, top: 0, zIndex: 100 }}>
        <SidebarContent />
      </aside>
      <button onClick={() => setMobileOpen(!mobileOpen)} style={{ position: "fixed", top: "1rem", left: "1rem", zIndex: 200, background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "0.5rem", width: "40px", height: "40px", display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-gold)" }}>
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
    </>
  );
}