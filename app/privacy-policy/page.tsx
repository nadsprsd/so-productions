import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad" style={{ maxWidth: "720px" }}>
        <h1 className="display-md" style={{ color: "var(--color-platinum)", marginBottom: "0.5rem" }}>Privacy <span className="gold-gradient">Policy</span></h1>
        <p style={{ color: "var(--color-platinum-dim)", marginBottom: "3rem", fontSize: "0.85rem" }}>Last updated: January 2025</p>
        {[
          { title: "Information We Collect", body: "We collect information you provide directly to us, such as when you submit a contact form, request a quote, or communicate with us by email or phone. This may include your name, email address, phone number, and details about your event." },
          { title: "How We Use Your Information", body: "We use the information we collect to respond to your enquiries, provide quotes and services, send you relevant updates (only with your consent), and improve our services." },
          { title: "Information Sharing", body: "We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website, provided they agree to keep this information confidential." },
          { title: "Data Security", body: "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction." },
          { title: "Contact Us", body: "If you have questions about this Privacy Policy, please contact us at hello@soproductions.co.za." },
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
