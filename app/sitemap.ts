import type { MetadataRoute } from "next";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://soproductions.co.za";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/about", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/services/sound-engineering", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/music-production", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/dj-services", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/stage-sound", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/school-event-sound", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/guitar-support", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/works", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/gallery", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/locations", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/contact", priority: 0.9, changeFrequency: "yearly" as const },
  ];
  return routes.map(r => ({ url: `${siteUrl}${r.url}`, lastModified: new Date(), changeFrequency: r.changeFrequency, priority: r.priority }));
}
