import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };
export default function TermsPage() {
  return (
    <div style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad" style={{ maxWidth: "720px" }}>
        <h1 className="display-md" style={{ color: "var(--color-platinum)", marginBottom: "0.5rem" }}>Terms of <span className="gold-gradient">Service</span></h1>
        <p style={{ color: "var(--color-platinum-dim)", marginBottom: "3rem", fontSize: "0.85rem" }}>Last updated: January 2025</p>
        {[
          { title: "Acceptance of Terms", body: "By engaging So Productions for any services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services." },
          { title: "Services", body: "So Productions provides sound engineering, event production, music production, DJ services, and related audio services as described in individual service agreements." },
          { title: "Bookings & Deposits", body: "A deposit of 50% is required to secure your booking date. The remaining balance is due 7 days before the event. Cancellations within 14 days of the event may forfeit the deposit." },
          { title: "Liability", body: "So Productions will not be liable for any indirect or consequential loss arising from the provision of services, including but not limited to technical failures outside our reasonable control." },
          { title: "Intellectual Property", body: "Any recordings, mixes, or productions created by So Productions remain the intellectual property of So Productions until full payment has been received." },
          { title: "Contact", body: "For any questions about these terms, contact us at hello@soproductions.co.za." },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--color-gold-light)", fontWeight: 400, marginBottom: "0.75rem" }}>{s.title}</h2>
            <p style={{ color: "var(--color-platinum-dim)", lineHeight: 1.85 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
