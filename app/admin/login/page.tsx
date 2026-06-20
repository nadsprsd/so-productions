"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Invalid credentials"); return; }
      router.push("/admin/dashboard");
    } catch { setError("Network error"); } finally { setLoading(false); }
  };

  const inputStyle = { width: "100%", padding: "0.9rem 1.1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "0.65rem", color: "var(--color-platinum)", fontSize: "0.9rem", outline: "none", fontFamily: "var(--font-body)", marginTop: "0.4rem" };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-obsidian)" }}>
      <div className="glass" style={{ width: "100%", maxWidth: "420px", padding: "3rem", margin: "1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-platinum)", fontWeight: 300, marginBottom: "0.5rem" }}>Admin <span style={{ color: "var(--color-gold)" }}>Login</span></h1>
          <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.85rem" }}>So Productions Management</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold-dim)" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="admin@soproductions.co.za" required autoComplete="email" />
          </div>
          <div>
            <label style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-gold-dim)" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" required autoComplete="current-password" />
          </div>
          {error && <p style={{ color: "#e05050", fontSize: "0.82rem", textAlign: "center" }}>{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: "center", marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }}>
            <span>{loading ? "Signing in..." : "Sign In"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
