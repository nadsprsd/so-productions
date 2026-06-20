import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const item = await Testimonial.findById(id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const item = await Testimonial.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const item = await Testimonial.findByIdAndDelete(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
