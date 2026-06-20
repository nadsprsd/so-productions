import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";
import { connectDB } from "@/lib/mongodb";
import { BlogPost } from "@/models/Blogpost";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  await connectDB();
  const posts = await BlogPost.find({}).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  try {
    await connectDB();
    const body = await req.json();
    const newPost = await BlogPost.create(body);
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}