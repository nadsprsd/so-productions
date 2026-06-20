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
  status?: string;
}

const fallbackJournal: Post[] = [
  {
    _id: "fb1",
    title: "The Science of Sub-Bass: Engineering Clean Low-End for Live Concerts",
    category: "Sound Engineering",
    excerpt: "Discover how to manage phase cancellation and deploy cardiod sub configurations to keep your low-end hitting perfectly clear.",
    createdAt: new Date().toISOString(),
    slug: "science-of-sub-bass"
  },
  {
    _id: "fb2",
    title: "Top 5 Wireless Microphone Systems for Corporate Events in 2026",
    category: "Audio Systems",
    excerpt: "An in-depth review of spectrum efficiency, encryption security, and real-world range handling under intense signal congestion.",
    createdAt: new Date().toISOString(),
    slug: "wireless-mic-systems-corporate"
  },
  {
    _id: "fb3",
    title: "Behind the Scenes: Managing FOH Audio for 3,500+ Outdoor Festivals",
    category: "Festival Sound",
    excerpt: "How we configured a 96-channel console array profile path and coordinated backline changeovers under tight production limits.",
    createdAt: new Date().toISOString(),
    slug: "behind-the-scenes-foh-festival"
  }
];

export default function PublicBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublicPosts() {
      try {
        const res = await fetch("/api/admin/blog");
        if (res.ok) {
          const data = await res.json();
          // Safe checking: Display post if status field matches published or is omitted entirely
          const published = data.filter((p: any) => !p.status || p.status === "published");
          
          if (published.length > 0) {
            setPosts(published);
          } else {
            setPosts(fallbackJournal);
          }
        } else {
          setPosts(fallbackJournal);
        }
      } catch (err) {
        console.error("Failed to load public blog index:", err);
        setPosts(fallbackJournal);
      } finally {
        setLoading(false);
      }
    }
    fetchPublicPosts();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "12rem 2rem", background: "var(--color-obsidian)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "var(--color-platinum-dim)" }}>
        <Loader2 size={20} className="animate-spin" /> Loading Articles...
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
                      {new Date(post.createdAt || new Date()).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
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