import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/models/Testimonial";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  await connectDB();

  const body = await req.json();
  const { name, role, company, quote, stars, avatar, featured, status } = body;

  if (!name || !role || !quote) {
    return NextResponse.json({ error: "Name, role, and quote are required" }, { status: 400 });
  }

  const testimonial = await Testimonial.create({
    name, role,
    company: company || "",
    quote,
    stars: stars ?? 5,
    avatar: avatar || "",
    featured: featured || false,
    status: status || "active",
  });

  return NextResponse.json(testimonial, { status: 201 });
}
