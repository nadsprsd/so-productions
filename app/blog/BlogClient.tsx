"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const posts = [
  { title: "How to Choose the Right PA System for Your Event", slug: "choosing-pa-system", category: "Education", readTime: "5 min", excerpt: "Not all PA systems are created equal. Whether you're hosting 50 or 5,000 people, here's what to look for when specifying sound.", date: "12 March 2024" },
  { title: "What Great Live Sound Actually Feels Like", slug: "great-live-sound", category: "Insight", readTime: "4 min", excerpt: "Great sound isn't about volume. It's about clarity, depth, and presence. We break down what separates average audio from unforgettable.", date: "28 Feb 2024" },
  { title: "5 Things to Ask Your Sound Engineer Before the Event", slug: "questions-for-sound-engineer", category: "Tips", readTime: "3 min", excerpt: "Avoid surprises on the day. These five questions will tell you everything about whether your audio is in good hands.", date: "10 Jan 2024" },
  { title: "School Events on a Budget: Getting Great Sound Without Breaking the Bank", slug: "school-events-budget-sound", category: "Schools", readTime: "6 min", excerpt: "You don't need a massive budget to have great sound at a school event. Here's how we make it work every time.", date: "5 Nov 2023" },
];

export function BlogClient() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-hero", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
      gsap.fromTo(".blog-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".blog-grid", start: "top 75%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad">
        <div className="blog-hero" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>From the Studio</p>
          <h1 className="display-lg" style={{ color: "var(--color-platinum)" }}>Articles & <span className="gold-gradient">insights</span></h1>
        </div>
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {posts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`} className="blog-card glass" style={{ display: "block", padding: "2rem", textDecoration: "none", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.35)"; el.style.boxShadow = "0 20px 40px rgba(201,168,76,0.1)"; el.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.12)"; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ padding: "0.2rem 0.7rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "9999px", fontSize: "0.65rem", color: "var(--color-gold)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{post.category}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--color-platinum-dim)" }}><Clock size={11} />{post.readTime}</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "0.75rem", lineHeight: 1.35 }}>{post.title}</h2>
              <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{post.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--color-platinum-dim)" }}>{post.date}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--color-gold)", fontSize: "0.78rem" }}>Read <ArrowRight size={12} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
