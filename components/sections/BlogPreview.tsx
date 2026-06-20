"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Loader2 } from "lucide-react";

interface PostItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  status: string;
}

export function BlogPreview() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 🛠️ Fetch live items directly from your local file system database engine
  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        const res = await fetch("/api/admin/blog");
        if (res.ok) {
          const data = await res.json();
          // Filter out drafts and grab only the 3 most recent published articles
          const published = data
            .filter((p: any) => p.status === "published")
            .slice(-3) // Grabs the latest 3 items
            .reverse(); // Keeps newest posts at the front of the list
          setPosts(published);
        }
      } catch (err) {
        console.error("Failed to sync home page blog feed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestPosts();
  }, []);

  // Simple clean helper to calculate read time dynamically based on word count
  const getReadTime = (content: string = "") => {
    const words = content.split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return `${time < 1 ? 1 : time} min read`;
  };

  return (
    <section className="section-pad" style={{ background: "var(--color-obsidian-light)" }}>
      <div className="container-main">
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "3rem" }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>From the Studio</p>
            <h2 className="display-lg" style={{ color: "var(--color-platinum)" }}>
              Latest <span className="gold-gradient">articles</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-ghost">All Articles <ArrowRight size={14} /></Link>
        </div>

        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-platinum-dim)", padding: "2rem 0" }}>
            <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Syncing latest articles...
          </div>
        ) : posts.length === 0 ? (
          <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.9rem" }}>No articles published yet. Check back soon!</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {posts.map((post, i) => (
              <Link key={post._id || post.id || i} href={`/blog/${post.slug}`} className="glass" style={{
                display: "block", padding: "2rem", textDecoration: "none", transition: "border-color 0.3s, box-shadow 0.3s",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.3)"; el.style.boxShadow = "var(--shadow-gold-sm)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(201,168,76,0.12)"; el.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ padding: "0.2rem 0.7rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "9999px", fontSize: "0.65rem", color: "var(--color-gold)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{post.category}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "var(--color-platinum-dim)" }}>
                    <Clock size={11} /> {getReadTime(post.content)}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "0.75rem", lineHeight: 1.35 }}>{post.title}</h3>
                <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.85rem", lineHeight: 1.7 }}>{post.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "1.25rem", color: "var(--color-gold)", fontSize: "0.78rem", fontWeight: 500 }}>
                  Read more <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}