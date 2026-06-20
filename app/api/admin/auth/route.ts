import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/validations/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    // 1. Safe Fallbacks: Reads from .env.local, but hardcodes values if Windows blocks the file lookup
    const JWT_SECRET = process.env.JWT_SECRET || "a5eb375460f3937b7de929cb6bc685142c0f8a63ff4e9fb8a60de3310a2fdceb02ddb02fcc587bca8cfde5f7370f461716b68e64b0b1541fd97eda12c08a330b";
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "prasadnads@gmail.com";
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "$2a$10$r2MR0yo7NLl8CF6pYWSMieGA5dhSvOzbfmenE91Z9FMhwsFfkJEIG";

    const body = await req.json();
    const result = loginSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const { email, password } = result.data;

    // Optional: Keep these debug logs active for your first login attempt
    console.log("--- FRESH FRESH RUN AUTH DEBUG ---");
    console.log("Form email received:", email);
    console.log("Emails match?:", email === ADMIN_EMAIL);

    if (email !== ADMIN_EMAIL) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log("Does password match?:", valid);
    console.log("----------------------------------");

    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "24h" });

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", 
      maxAge: 86400, 
      path: "/",
    });
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}