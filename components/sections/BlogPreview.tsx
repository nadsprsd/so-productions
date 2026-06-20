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

// Premium fallback dataset to display if the database engine is empty
const fallbackPosts: PostItem[] = [
  {
    id: "b1",
    title: "The Science of Sub-Bass: Engineering Clean Low-End for Live Concerts",
    slug: "science-of-sub-bass",
    category: "Sound Engineering",
    excerpt: "Discover how to manage phase cancellation and deploy cardiod sub configurations to keep your low-end hitting perfectly clear.",
    content: "When engineering live sound, low-end frequencies present the ultimate challenge... tracking alignment, time delays, and multi-cabinet coupling change the room context completely.",
    status: "published"
  },
  {
    id: "b2",
    title: "Top 5 Wireless Microphone Systems for Corporate Events in 2026",
    slug: "wireless-mic-systems-corporate",
    category: "Audio Systems",
    excerpt: "An in-depth review of spectrum efficiency, encryption security, and real-world range handling under intense signal congestion.",
    content: "Corporate environments demand absolute stability. Shifting spectrum profiles mean digital signal protection tracking is no longer optional.",
    status: "published"
  },
  {
    id: "b3",
    title: "Behind the Scenes: Managing FOH Audio for 3,500+ Outdoor Festivals",
    slug: "behind-the-scenes-foh-festival",
    category: "Festival Sound",
    excerpt: "How we configured a 96-channel console array profile path and coordinated backline changeovers under tight production limits.",
    content: "Outdoor festivals test more than your audio gear; they test your baseline operating limits under extreme real-world environmental elements.",
    status: "published"
  }
];

export function BlogPreview() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        const res = await fetch("/api/admin/blog");
        if (res.ok) {
          const data = await res.json();
          // Safe protection maps posts cleanly whether explicit status is matched or missing
          const published = data.filter((p: any) => !p.status || p.status === "published");
          
          if (published.length > 0) {
            setPosts(published.slice(-3).reverse());
          } else {
            setPosts(fallbackPosts);
          }
        } else {
          setPosts(fallbackPosts);
        }
      } catch (err) {
        console.error("Failed to sync home page blog feed:", err);
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestPosts();
  }, []);

  const getReadTime = (content: string = "") => {
    const words = content ? content.split(/\s+/).length : 200;
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
            <Loader2 size={16} className="animate-spin" /> Syncing latest articles...
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
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "1rem", color: "var(--color-gold)", fontSize: "0.78rem", fontWeight: 500 }}>
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