import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | So Productions",
  description: "The story behind So Productions — our passion for live sound, our journey, our values, and our commitment to delivering exceptional audio at every event.",
  openGraph: { title: "About So Productions", description: "The story, values and team behind South Africa's premier sound production company." },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])} />
      <AboutClient />
    </>
  );
}
