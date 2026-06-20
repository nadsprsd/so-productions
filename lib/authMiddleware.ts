import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "a5eb375460f3937b7de929cb6bc685142c0f8a63ff4e9fb8a60de3310a2fdceb02ddb02fcc587bca8cfde5f7370f461716b68e64b0b1541fd97eda12c08a330b";

export function verifyAdmin(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
    return decoded.role === "admin";
  } catch {
    return false;
  }
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
