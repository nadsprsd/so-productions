import type { Metadata } from "next";
import { LocationsClient } from "./LocationsClient";
export const metadata: Metadata = {
  title: "Locations | So Productions",
  description: "So Productions provides professional sound and event production across South Africa including Johannesburg, Cape Town, Pretoria, Durban and more.",
};
export default function LocationsPage() { return <LocationsClient />; }
