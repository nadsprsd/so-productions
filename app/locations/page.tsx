import type { Metadata } from "next";
import { LocationsClient } from "./LocationsClient";
export const metadata: Metadata = {
  title: "Locations | So Productions",
  description: "So Productions provides professional sound and event production across the USA including New Jersey, Philadelphia, New York, and more.",
};
export default function LocationsPage() { return <LocationsClient />; }
