import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/BlogPost";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const post = await BlogPost.findById(id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  const body = await req.json();
  await connectDB();
  const updated = await BlogPost.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  await BlogPost.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}