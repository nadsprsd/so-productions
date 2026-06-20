const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://soproductions.co.za";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "So Productions",
  description: "Premium sound engineering and event production services across South Africa.",
  url: siteUrl,
  telephone: "+27000000000",
  email: "hello@soproductions.co.za",
  address: { "@type": "PostalAddress", addressLocality: "Johannesburg", addressRegion: "Gauteng", addressCountry: "ZA" },
  geo: { "@type": "GeoCoordinates", latitude: -26.2041, longitude: 28.0473 },
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
  contactPoint: { "@type": "ContactPoint", telephone: "+27000000000", contactType: "customer service" },
};

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${url}`,
    provider: { "@type": "LocalBusiness", name: "So Productions", url: siteUrl },
    areaServed: { "@type": "Country", name: "South Africa" },
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
