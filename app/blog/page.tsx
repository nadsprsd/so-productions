"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  createdAt: string;
  slug: string;
}

export default function PublicBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the live blog data we save in data/blog.json
  useEffect(() => {
    async function fetchPublicPosts() {
      try {
        // We call our unified local backend route
        const res = await fetch("/api/admin/blog");
        if (res.ok) {
          const data = await res.json();
          // Filter to show only published posts to the public
          const published = data.filter((p: any) => p.status === "published");
          setPosts(published);
        }
      } catch (err) {
        console.error("Failed to load public blog index:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPublicPosts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "12rem 2rem", background: "var(--color-obsidian)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "var(--color-platinum-dim)" }}>
        <Loader2 size={20} style={{ animation: "spin 1s linear infinite" }} /> Loading Articles...
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "10rem", background: "var(--color-obsidian)", minHeight: "100vh" }}>
      <div className="container-main section-pad">
        <div style={{ marginBottom: "4rem", textAlign: "center" }}>
          <p className="eyebrow" style={{ marginBottom: "1rem" }}>Insights & Updates</p>
          <h1 className="display-lg" style={{ color: "var(--color-platinum)" }}>The <span className="gold-gradient">SO Journal</span></h1>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: "var(--color-platinum-dim)", textAlign: "center", fontSize: "0.9rem" }}>No published articles available at the moment. Check back soon!</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
            {posts.map((post) => (
              <article key={post._id} className="glass" style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(201,168,76,0.1)", background: "var(--color-obsidian-light)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ padding: "0.2rem 0.65rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "9999px", fontSize: "0.65rem", color: "var(--color-gold)" }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-platinum-dim)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Calendar size={12} />
                      {new Date(post.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--color-platinum)", fontWeight: 400, marginBottom: "0.75rem", lineHeight: 1.4 }}>
                    {post.title}
                  </h2>
                  
                  <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.5rem", flexGrow: 1 }}>
                    {post.excerpt}
                  </p>

                  <Link href={`/blog/${post.slug}`} style={{ color: "var(--color-gold)", textDecoration: "none", fontSize: "0.82rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.25rem", marginTop: "auto" }}>
                    Read Article <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}