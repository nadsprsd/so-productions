"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Loader2 } from "lucide-react";

interface Post { 
  _id?: string; 
  id?: string; 
  title: string; 
  category: string; 
  status: string; 
  createdAt: string; 
  slug: string; 
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = () => {
    setLoading(true);
    fetch("/api/admin/blog")
      .then(r => r.json())
      .then(data => { 
        setPosts(Array.isArray(data) ? data : []); 
        setLoading(false); 
      })
      .catch(() => { 
        setError("Failed to load posts"); 
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (post: Post) => {
    // 🛠️ Safely grab whichever ID format is present (MongoDB _id or local JSON id)
    const targetId = post._id || post.id;
    
    if (!targetId) {
      alert("Error: This post does not have a valid identifier ID.");
      return;
    }

    if (!confirm(`Delete "${post.title}" permanently?`)) return;
    
    try {
      const res = await fetch(`/api/admin/blog/${targetId}`, { method: "DELETE" });
      if (res.ok) {
        // Remove item from state cleanly
        setPosts(p => p.filter(x => (x._id !== targetId && x.id !== targetId)));
      } else {
        alert("Failed to delete from backend.");
      }
    } catch (err) {
      alert("Network error trying to delete.");
    }
  };

  return (
    <div style={{ padding: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--color-platinum)", fontWeight: 300 }}>Blog <span style={{ color: "var(--color-gold)" }}>Posts</span></h1>
          <p style={{ color: "var(--color-platinum-dim)", fontSize: "0.82rem", marginTop: "0.25rem" }}>{posts.length} total posts</p>
        </div>
        <Link href="/admin/blog/new" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 1.4rem", background: "linear-gradient(135deg, #c9a84c, #8a6f32)", color: "#080808", borderRadius: "9999px", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700 }}>
          <Plus size={15} /> New Post
        </Link>
      </div>
      
      {loading && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-platinum-dim)", padding: "2rem" }}><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Loading posts...</div>}
      {error && <p style={{ color: "#e05050", padding: "1rem" }}>{error}</p>}
      
      {!loading && !error && (
        <div style={{ background: "var(--color-obsidian-light)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "0.85rem", overflow: "hidden" }}>
          {posts.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-platinum-dim)" }}>
              <p style={{ marginBottom: "1rem" }}>No blog posts yet.</p>
              <Link href="/admin/blog/new" style={{ color: "var(--color-gold)", textDecoration: "none" }}>Write your first post →</Link>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                  {["Title", "Category", "Status", "Date", "Actions"].map(h => (
                    <th key={h} style={{ padding: "1rem 1.25rem", textAlign: "left", fontSize: "0.68rem", color: "var(--color-gold-dim)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => {
                  const currentId = post._id || post.id || `fallback-${i}`;
                  return (
                    <tr key={currentId} style={{ borderBottom: i < posts.length - 1 ? "1px solid rgba(201,168,76,0.06)" : "none" }}>
                      <td style={{ padding: "1rem 1.25rem", fontSize: "0.85rem", color: "var(--color-platinum)", fontWeight: 500 }}>{post.title}</td>
                      <td style={{ padding: "1rem 1.25rem" }}><span style={{ padding: "0.2rem 0.65rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "9999px", fontSize: "0.65rem", color: "var(--color-gold)" }}>{post.category}</span></td>
                      <td style={{ padding: "1rem 1.25rem" }}><span style={{ padding: "0.2rem 0.65rem", background: post.status === "published" ? "rgba(34,197,94,0.1)" : "rgba(201,168,76,0.06)", border: `1px solid ${post.status === "published" ? "rgba(34,197,94,0.3)" : "rgba(201,168,76,0.15)"}`, borderRadius: "9999px", fontSize: "0.65rem", color: post.status === "published" ? "#22c55e" : "var(--color-gold-dim)" }}>{post.status}</span></td>
                      <td style={{ padding: "1rem 1.25rem", fontSize: "0.78rem", color: "var(--color-platinum-dim)" }}>
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "N/A"}
                      </td>
                      <td style={{ padding: "1rem 1.25rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Link href={`/blog/${post.slug}`} target="_blank" style={{ width: "32px", height: "32px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold-dim)", textDecoration: "none" }}><Eye size={14} /></Link>
                          <Link href={`/admin/blog/${currentId}`} style={{ width: "32px", height: "32px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)", textDecoration: "none" }}><Edit size={14} /></Link>
                          <button onClick={() => deletePost(post)} style={{ width: "32px", height: "32px", background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#e05050", cursor: "pointer" }}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}