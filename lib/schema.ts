// 🛠️ UPDATED: Set to your new US domain if applicable, or keep your base URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://soproductions.vercel.app";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "So Productions",
  description: "Premium sound engineering and event production services across New Jersey, Philadelphia, and New York.",
  url: siteUrl,
  telephone: "+1-000-000-0000", // Update with your US phone number
  email: "hello@soproductions.co.za",
  address: { 
    "@type": "PostalAddress", 
    addressLocality: "Newark", 
    addressRegion: "NJ", 
    addressCountry: "US" 
  },
  geo: { "@type": "GeoCoordinates", latitude: 40.7357, longitude: -74.1724 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "15:00" },
  ],
  sameAs: ["https://instagram.com/soproductions", "https://facebook.com/soproductions"],
  priceRange: "$$",
  image: `${siteUrl}/images/og-default.jpg`,
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "So Productions",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  contactPoint: { "@type": "ContactPoint", telephone: "+1-000-000-0000", contactType: "customer service" },
};

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${url}`,
    provider: { "@type": "LocalBusiness", name: "So Productions", url: siteUrl },
    // 🛠️ Updated to represent the new service area
    areaServed: { "@type": "AdministrativeArea", name: "Tri-State Area (NJ, PA, NY)" },
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.url}`,
    })),
  };
}