import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "data", "blog.json");

function readData() {
  try {
    return JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  } catch (e) {
    return [];
  }
}

function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  
  const { id } = await params;
  const posts = readData();
  const post = posts.find((p: any) => p._id === id || p.id === id);
  
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  
  const { id } = await params;
  const body = await req.json();
  let posts = readData();
  
  const postIndex = posts.findIndex((p: any) => p._id === id || p.id === id);
  if (postIndex === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Merge updates cleanly
  posts[postIndex] = { ...posts[postIndex], ...body };
  writeData(posts);

  return NextResponse.json(posts[postIndex]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  
  const { id } = await params;
  let posts = readData();
  
  const initialLength = posts.length;
  posts = posts.filter((p: any) => p._id !== id && p.id !== id);
  
  if (posts.length === initialLength) return NextResponse.json({ error: "Not found" }, { status: 404 });
  
  writeData(posts);
  return NextResponse.json({ success: true });
}