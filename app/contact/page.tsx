"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/validations/contact";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) { setServerError(json.error || "Something went wrong."); return; }
      setSubmitted(true);
    } catch { setServerError("Network error. Please try again."); }
  };

  const inputStyle = { width: "100%", padding: "0.9rem 1.1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.65rem", color: "var(--color-platinum)", fontSize: "0.9rem", outline: "none", fontFamily: "var(--font-body)" };
  const labelStyle = { display: "block", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--color-gold-dim)", marginBottom: "0.5rem" };
  const errStyle = { fontSize: "0.75rem", color: "#e05050", marginTop: "0.35rem" };

  return (
    <div style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Get In Touch</p>
          <h1 className="display-lg" style={{ color: "var(--color-platinum)" }}>Let&apos;s talk about your <span className="gold-gradient">event</span></h1>
          <p style={{ color: "var(--color-platinum-dim)", maxWidth: "480px", margin: "1.25rem auto 0", lineHeight: 1.75 }}>
            Tell us about your event and we&apos;ll come back to you within 24 hours with a tailored proposal.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "4rem", alignItems: "start" }}>
          {/* Form */}
          <div className="glass" style={{ padding: "2.5rem" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ width: "60px", height: "60px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.5rem" }}>✓</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-gold)", marginBottom: "1rem" }}>Message received!</h3>
                <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.7 }}>Thank you for reaching out. We&apos;ll review your brief and get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input {...register("name")} style={inputStyle} placeholder="Your name" />
                    {errors.name && <p style={errStyle}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input {...register("email")} type="email" style={inputStyle} placeholder="you@email.com" />
                    {errors.email && <p style={errStyle}>{errors.email.message}</p>}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input {...register("phone")} style={inputStyle} placeholder="+27 000 000 0000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Event Date</label>
                    <input {...register("eventDate")} type="date" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Event Type</label>
                  <select {...register("eventType")} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select event type...</option>
                    {["Corporate Event","School Event","Festival / Concert","Wedding","Private Party","Live Performance","Other"].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Tell Us About Your Event *</label>
                  <textarea {...register("message")} rows={5} style={{ ...inputStyle, resize: "vertical" }} placeholder="Describe your event, venue, expected attendance, and anything else we should know..." />
                  {errors.message && <p style={errStyle}>{errors.message.message}</p>}
                </div>
                {serverError && <p style={{ ...errStyle, fontSize: "0.85rem" }}>{serverError}</p>}
                <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ justifyContent: "center", opacity: isSubmitting ? 0.7 : 1 }}>
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { icon: <Phone size={20} />, label: "Phone", value: "+27 (0) 00 000 0000", href: "tel:+270000000000" },
              { icon: <Mail size={20} />, label: "Email", value: "hello@soproductions.co.za", href: "mailto:hello@soproductions.co.za" },
              { icon: <MapPin size={20} />, label: "Location", value: "Johannesburg & Cape Town, South Africa", href: "/locations" },
              { icon: <Clock size={20} />, label: "Hours", value: "Mon–Fri 8am–6pm · Sat 9am–3pm", href: undefined },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ width: "48px", height: "48px", flexShrink: 0, background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)" }}>{item.icon}</div>
                <div>
                  <p className="eyebrow" style={{ marginBottom: "0.3rem", fontSize: "0.6rem" }}>{item.label}</p>
                  {item.href ? <a href={item.href} style={{ color: "var(--color-platinum)", fontSize: "0.95rem", textDecoration: "none" }}>{item.value}</a> : <p style={{ color: "var(--color-platinum)", fontSize: "0.95rem" }}>{item.value}</p>}
                </div>
              </div>
            ))}
            <a href="https://wa.me/27000000000" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: "center", background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
