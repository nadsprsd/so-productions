"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface PostItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  createdAt?: string;
  status: string;
}

export function BlogClient() {
  const ref = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogJournal() {
      try {
        // 🛠️ FETCHES LIVE DATA: Replaces the static array with an live API stream containing a timestamp parameter to break cache
        const res = await fetch(`/api/admin/blog?t=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" }
        });
        if (res.ok) {
          const data = await res.json();
          // Filter to only display active published articles
          const published = data.filter((p: any) => !p.status || p.status === "published");
          setPosts(published);
        }
      } catch (err) {
        console.error("Failed to hydrate standard journal view grid:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogJournal();
  }, []);

  useEffect(() => {
    if (loading || posts.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-hero", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
      gsap.fromTo(".blog-card", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".blog-grid", start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, [loading, posts]);

  const getReadTime = (content: string = "") => {
    const words = content ? content.split(/\s+/).length : 200;
    const time = Math.ceil(words / 200);
    return `${time < 1 ? 1 : time} min read`;
  };

  return (
    <div ref={ref} style={{ paddingTop: "8rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad">
        <div className="blog-hero" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>From the Studio</p>
          <h1 className="display-lg" style={{ color: "var(--color-platinum)" }}>Articles & <span className="gold-gradient">insights</span></h1>
        </div>

        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "var(--color-platinum-dim)", padding: "4rem 0" }}>
            <Loader2 size={18} className="animate-spin" /> Hydrating journal timeline...
          </div>
        ) : posts.length === 0 ? (
          <p style={{ color: "var(--color-platinum-dim)", textAlign: "center", fontSize: "0.9rem" }}>No articles published yet. Check back soon!</p>
        ) : (
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {posts.map((post, i) => (
              <Link key={post._id || post.id || i} href={`/blog/${post.slug}`} className="blog-card glass" style={{ display: "block", padding: "2rem", textDecoration: "none", transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.35)"; el.style.boxShadow = "0 20px 40px rgba(201,168,76,0.1)"; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.12)"; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ padding: "0.2rem 0.7rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "9999px", fontSize: "0.65rem", color: "var(--color-gold)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{post.category}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--color-platinum-dim)" }}>
                    <Clock size={11} /> {getReadTime(post.content)}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "0.75rem", lineHeight: 1.35 }}>{post.title}</h3>
                <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{post.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--color-platinum-dim)" }}>
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "Recent"}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--color-gold)", fontSize: "0.78rem" }}>Read <ArrowRight size={12} /></span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}