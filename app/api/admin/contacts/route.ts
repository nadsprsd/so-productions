import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ContactSubmission } from "@/models/ContactSubmission";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  await connectDB();
  const contacts = await ContactSubmission.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(contacts);
}
