import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
const dataFilePath = path.join(process.cwd(), "data", "services.json");

// Safe helper to handle file system CRUD operations
function readData() {
  try {
    if (!fs.existsSync(path.dirname(dataFilePath))) {
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      // Seeds the default template list so your site loads beautifully out of the box
      const defaultData = [
        { 
          id: "sound-engineering", 
          title: "Sound Engineering", 
          excerpt: "Live mixing, monitor engineering, and FOH sound for concerts, conferences, and events of every scale.", 
          description: "Live mixing, monitor engineering, and FOH sound for concerts, conferences, and events of every scale.",
          image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200", 
          status: "active" 
        },
        { 
          id: "music-production", 
          title: "Music Production", 
          excerpt: "Full-service music production — from initial concept and arrangement through tracking, mixing, and mastering.", 
          description: "Full-service music production — from initial concept and arrangement through tracking, mixing, and mastering.",
          image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200", 
          status: "active" 
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

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const data = readData();
  
  if (id) {
    const service = data.find((s: any) => s.id === id);
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    return NextResponse.json(service);
  }
  
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();
  try {
    const body = await req.json();
    let data = readData();

    if (body.action === "delete") {
      data = data.filter((s: any) => s.id !== body.id);
      writeData(data);
      return NextResponse.json({ success: true });
    }

    if (body.action === "update") {
      data = data.map((s: any) => s.id === body.id ? { ...s, ...body } : s);
      writeData(data);
      return NextResponse.json({ success: true });
    }

    // Creating a brand-new unique URL slug-id from the title string input
    const newId = body.title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/ +/g, "-");
    const newService = { id: newId, status: "active", ...body };
    data.push(newService);
    writeData(data);

    return NextResponse.json({ success: true, data: newService });
  } catch (e) {
    return NextResponse.json({ error: "Failed to process database write payload" }, { status: 500 });
  }
}