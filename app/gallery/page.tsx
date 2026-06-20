import type { Metadata } from "next";
import { GalleryClient } from "./GalleryClient";
export const metadata: Metadata = {
  title: "Gallery | So Productions",
  description: "Photos and videos from So Productions events across South Africa.",
};
export default function GalleryPage() { return <GalleryClient />; }
