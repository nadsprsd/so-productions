import type { Metadata } from "next";
import { ServicesClient } from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services | So Productions",
  description: "Professional sound engineering, music production, DJ services, stage systems, school event audio, and guitar support across South Africa.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}

