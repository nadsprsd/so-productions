import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

interface ServiceDetailProps {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  whatsIncluded: string[];
  process: { step: string; description: string }[];
  equipment: string[];
  faqs: { question: string; answer: string }[];
  relatedServices: { title: string; slug: string }[];
}

export function ServiceDetail({ title, slug, tagline, description, whatsIncluded, process, equipment, faqs, relatedServices }: ServiceDetailProps) {
  return (
    <>
      <JsonLd data={serviceSchema(title, description, `/services/${slug}`)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: title, url: `/services/${slug}` }])} />
      <div style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>

        {/* Hero */}
        <section className="section-pad-sm" style={{ borderBottom: "1px solid rgba(201,168,76,0.08)", textAlign: "center" }}>
          <div className="container-main" style={{ maxWidth: "680px", margin: "0 auto" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Our Services</p>
            <h1 className="display-lg" style={{ color: "var(--color-platinum)", marginBottom: "1.25rem" }}><span className="gold-gradient">{title}</span></h1>
            <p style={{ color: "var(--color-platinum-dim)", fontSize: "1.05rem", lineHeight: 1.8 }}>{tagline}</p>
          </div>
        </section>

        {/* Description + Included */}
        <section className="section-pad" style={{ background: "var(--color-obsidian-light)" }}>
          <div className="container-main" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>About This Service</p>
              <h2 className="display-sm" style={{ color: "var(--color-platinum)", marginBottom: "1.25rem" }}>What we deliver</h2>
              <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.85, fontSize: "0.95rem" }}>{description}</p>
            </div>
            <div>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>What&apos;s Included</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {whatsIncluded.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <Check size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ color: "var(--color-platinum-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-pad" style={{ background: "var(--color-obsidian)" }}>
          <div className="container-main">
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>How It Works</p>
              <h2 className="display-md" style={{ color: "var(--color-platinum)" }}>Our <span className="gold-gradient">process</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
              {process.map((step, i) => (
                <div key={i} className="glass" style={{ padding: "2rem" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--color-gold-dim)", fontWeight: 300, marginBottom: "1rem", opacity: 0.4 }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "0.75rem" }}>{step.step}</h3>
                  <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.85rem", lineHeight: 1.75 }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment */}
        <section className="section-pad" style={{ background: "var(--color-obsidian-light)" }}>
          <div className="container-main">
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Tools of the Trade</p>
            <h2 className="display-sm" style={{ color: "var(--color-platinum)", marginBottom: "2rem" }}>Equipment & technology</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {equipment.map((item, i) => (
                <span key={i} style={{ padding: "0.45rem 1.1rem", background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "9999px", fontSize: "0.82rem", color: "var(--color-platinum-dim)" }}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-pad" style={{ background: "var(--color-obsidian)" }}>
          <div className="container-main" style={{ maxWidth: "720px" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Common Questions</p>
            <h2 className="display-sm" style={{ color: "var(--color-platinum)", marginBottom: "2rem" }}>Frequently asked</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(201,168,76,0.06)" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: "1.75rem 2rem", background: "var(--color-obsidian)" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-gold-light)", fontWeight: 400, marginBottom: "0.75rem" }}>{faq.question}</h3>
                  <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.75, fontSize: "0.9rem" }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-pad" style={{ background: "var(--color-obsidian-light)", textAlign: "center" }}>
          <div className="container-main" style={{ maxWidth: "560px", margin: "0 auto" }}>
            <h2 className="display-md" style={{ color: "var(--color-platinum)", marginBottom: "1.25rem" }}>Ready to book <span className="gold-gradient">{title}?</span></h2>
            <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.75, marginBottom: "2.5rem" }}>Get in touch today and we&apos;ll put together a custom quote for your event.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary"><span>Get a Quote</span><ArrowRight size={14} /></Link>
              <Link href="/works" className="btn-ghost">See Our Work</Link>
            </div>
          </div>
        </section>

        {/* Related */}
        {relatedServices.length > 0 && (
          <section className="section-pad-sm" style={{ background: "var(--color-obsidian)", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
            <div className="container-main">
              <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>You Might Also Need</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {relatedServices.map((rel) => (
                  <Link key={rel.slug} href={`/services/${rel.slug}`} className="btn-ghost">{rel.title} <ArrowRight size={13} /></Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
