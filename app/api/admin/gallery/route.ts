import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { GalleryItem } from "@/models/GalleryItem";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  await connectDB();
  const items = await GalleryItem.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  await connectDB();

  const body = await req.json();
  const { title, url, type, caption, event, category, featured, status, order } = body;

  if (!title || !url || !type) {
    return NextResponse.json({ error: "Title, URL, and type are required" }, { status: 400 });
  }

  if (!["image", "video"].includes(type)) {
    return NextResponse.json({ error: "Type must be image or video" }, { status: 400 });
  }

  const item = await GalleryItem.create({
    title, url, type,
    caption: caption || "",
    event: event || "",
    category: category || "",
    featured: featured || false,
    status: status || "active",
    order: order ?? 0,
  });

  return NextResponse.json(item, { status: 201 });
}
