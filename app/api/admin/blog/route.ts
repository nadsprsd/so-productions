import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const dataFilePath = path.join(process.cwd(), "data", "blog.json");

function readData() {
  try {
    if (!fs.existsSync(path.dirname(dataFilePath))) {
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      const defaultData = [
        {
          _id: "1",
          title: "Mastering Live Event Acoustics",
          slug: "mastering-live-event-acoustics",
          category: "Insight",
          excerpt: "How to tune audio line arrays under challenging weather conditions.",
          content: "Full breakdown guidelines...",
          status: "published",
          createdAt: new Date().toISOString(),
          seo: { metaTitle: "", metaDescription: "" }
        }
      ];
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    return JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  } catch (e) {
    return [];
  }
}

function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// GET handler: Fetches all posts for the admin table listing
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  return NextResponse.json(readData());
}

// POST handler: Saves brand new blog entries
export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  try {
    const body = await req.json();
    const currentData = readData();

    // Generate MongoDB-styled properties to prevent frontend UI crashes
    const newPost = {
      _id: "local_" + Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...body
    };

    currentData.push(newPost);
    writeData(currentData);

    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post record" }, { status: 500 });
  }
}