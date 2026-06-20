import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin, unauthorized } from "@/lib/authMiddleware";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
const dataFilePath = path.join(process.cwd(), "data", "works.json");

// Helper function to safely read the JSON file storage layer
function readData() {
  try {
    if (!fs.existsSync(path.dirname(dataFilePath))) {
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      // Starting default template items if database file doesn't exist yet
      const defaultData = [
        { id: "1", title: "Johannesburg Jazz Festival", type: "Festival", location: "Johannesburg, GP", date: "March 2024", tags: ["LINE ARRAY", "FOH", "OUTDOOR"], challenge: "Outdoor venue with severe wind conditions.", solution: "Deployed K2 delay stacks.", result: "Immaculate acoustics alignment.", status: "published" },
        { id: "2", title: "Discovery Vitality Gala", type: "Corporate", location: "Sandton, GP", date: "November 2023", tags: ["CORPORATE", "INDOOR"], challenge: "High-profile corporate event with strict audio clarity demands.", solution: "Distributed low-profile fill systems.", result: "Perfect speech intelligibility across all zones.", status: "published" },
        { id: "3", title: "Pinelands High School Musical", type: "School", location: "Cape Town, WC", date: "August 2023", tags: ["SCHOOL", "THEATRE"], challenge: "Challenging auditorium reverb layout constraints.", solution: "Accurate directional coverage balancing.", result: "Crystal-clear vocal production.", status: "published" }
      ];
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    return JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  } catch (error) {
    return [];
  }
}

function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// GET handler: Handles both individual detail lookups and full list table tracking
export async function GET(req: NextRequest) {
  // Optional security check - uncomment if you want to protect reads, or leave open for the public frontend site
  // if (!verifyAdmin(req)) return unauthorized();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const data = readData();
  
  if (id) {
    // 🛠️ Robust matcher: checks unique ID fields, string variations, and item position index fallbacks!
    const project = data.find((w: any, index: number) => 
      w.id === id || 
      w._id === id || 
      (index + 1).toString() === id ||
      w.title?.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/ +/g, "-") === id
    );
    
    if (!project) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  }
  
  return NextResponse.json(data);
}

// POST handler: Manages admin create, edit/update, and deletion pipelines
export async function POST(req: NextRequest) {
  // Keep admin sections strictly authenticated
  if (!verifyAdmin(req)) return unauthorized();

  try {
    const body = await req.json();
    let currentData = readData();

    if (body.action === "delete") {
      currentData = currentData.filter((w: any) => w.id !== body.id && w._id !== body.id);
      writeData(currentData);
      return NextResponse.json({ success: true });
    }

    if (body.action === "update") {
      currentData = currentData.map((w: any) => (w.id === body.id || w._id === body.id) ? { ...w, ...body } : w);
      writeData(currentData);
      return NextResponse.json({ success: true });
    }

    // Default action: Create/Add a completely new entry item
    const slugId = body.title ? body.title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/ +/g, "-") : Date.now().toString();
    const newWork = { 
      id: slugId, 
      _id: slugId, 
      status: body.status || "published", 
      createdAt: new Date().toISOString(),
      ...body 
    };
    
    currentData.push(newWork);
    writeData(currentData);
    return NextResponse.json({ success: true, data: newWork });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process data payload write operations" }, { status: 500 });
  }
}