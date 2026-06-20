import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/validations/contact";
import { connectDB } from "@/lib/mongodb";
import { ContactSubmission } from "@/models/ContactSubmission";

const rateLimit = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || entry.reset < now) { rateLimit.set(ip, { count: 1, reset: now + 60_000 }); return true; }
  if (entry.count >= 3) return false;
  entry.count++; return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    const body = await req.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 400 });
    await connectDB();
    await ContactSubmission.create({ ...result.data, ipAddress: ip });
    return NextResponse.json({ success: true, message: "Thank you! We'll be in touch within 24 hours." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
