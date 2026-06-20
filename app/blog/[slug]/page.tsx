"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default function BlogPostDetail({ params }: PageProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        // 🛠️ FIXED: Added identical timestamp cache-buster parameter and explicit network fetch flags
        const res = await fetch(`/api/admin/blog?t=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" }
        });
        if (res.ok) {
          const allPosts = await res.json();
          // 🛠️ FIXED: Blocks search matches if an article's status is explicitly marked as deleted/draft
          const match = allPosts.find((p: any) => p.slug === slug && (!p.status || p.status === "published"));
          setPost(match || null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: "12rem 2rem", background: "var(--color-obsidian)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "var(--color-platinum-dim)" }}>
        <Loader2 size={20} className="animate-spin" /> Opening Article...
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ padding: "12rem 2rem", background: "var(--color-obsidian)", minHeight: "100vh", textAlign: "center", color: "var(--color-platinum)" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1rem" }}>Article Not Found</h1>
        <Link href="/blog" style={{ color: "var(--color-gold)", textDecoration: "none" }}>← Back to Blog Journal</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "10rem", background: "var(--color-obsidian)", minHeight: "100vh", color: "var(--color-platinum)" }}>
      <div style={{ maxWidth: "750px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-gold)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "2rem" }}>
          <ArrowLeft size={14} /> Back to Journal Index
        </Link>

        <span style={{ padding: "0.2rem 0.65rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "9999px", fontSize: "0.65rem", color: "var(--color-gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {post.category}
        </span>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 300, marginTop: "1rem", marginBottom: "1.25rem", lineHeight: 1.2 }}>
          {post.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "var(--color-platinum-dim)", marginBottom: "3rem", borderBottom: "1px solid rgba(201,168,76,0.1)", paddingBottom: "1.5rem" }}>
          <Calendar size={14} />
          {new Date(post.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
        </div>

        <div style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "rgba(255,255,255,0.85)", whiteSpace: "pre-wrap" }}>
          {post.content.split("\n").map((paragraph: string, idx: number) => (
            <p key={idx} style={{ marginBottom: "1.5rem" }}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}