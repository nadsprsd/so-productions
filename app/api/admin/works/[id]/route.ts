import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Work } from "@/models/Work";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const work = await Work.findById(id).lean();
  if (!work) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(work);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const work = await Work.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true });
  if (!work) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(work);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const work = await Work.findByIdAndDelete(id);
  if (!work) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
