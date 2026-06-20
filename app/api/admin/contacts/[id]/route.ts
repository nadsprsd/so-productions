import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ContactSubmission } from "@/models/ContactSubmission";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const contact = await ContactSubmission.findById(id).lean();
  if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(contact);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const { status } = await req.json();
  if (!["new", "read", "replied"].includes(status)) {
    return NextResponse.json({ error: "Invalid status. Use: new, read, replied" }, { status: 400 });
  }
  const contact = await ContactSubmission.findByIdAndUpdate(id, { $set: { status } }, { new: true });
  if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(contact);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();
  const { id } = await params;
  await connectDB();
  const contact = await ContactSubmission.findByIdAndDelete(id);
  if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
