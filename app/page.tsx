import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { LatestWorks } from "@/components/sections/LatestWorks";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { LocationsPreview } from "@/components/sections/LocationsPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/ui/JsonLd";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "So Productions | Premium Sound & Event Production",
  description:
    "South Africa's premier sound engineering and event production company. From intimate school events to stadium-scale productions, we deliver audio excellence.",
  openGraph: {
    title: "So Productions | Premium Sound & Event Production",
    description:
      "South Africa's premier sound engineering and event production company.",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={organizationSchema} />
      <HeroSection />
      <TrustSection />
      <AboutPreview />
      <WhyChooseUs />
      <ServicesOverview />
      <LatestWorks />
      <GalleryPreview />
      <LocationsPreview />
      <TestimonialsSection />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
