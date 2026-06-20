import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define a safe local filepath on your machine to act as a database file
const dataFilePath = path.join(process.cwd(), "data", "locations.json");

// Helper function to safely read data from our file
function readData() {
  try {
    if (!fs.existsSync(path.dirname(dataFilePath))) {
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
      const defaultData = [
        { id: "1", city: "Johannesburg", province: "Gauteng", events: "180+" },
        { id: "2", city: "Cape Town", province: "Western Cape", events: "120+" },
        { id: "3", city: "Pretoria", province: "Gauteng", events: "60+" },
        { id: "4", city: "Durban", province: "KwaZulu-Natal", events: "30+" },
      ];
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Database read error:", error);
    return [];
  }
}

// Helper function to safely write data back to our file
function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// 1. GET Request: Returns the current list of locations to the frontend preview
export async function GET() {
  const locations = readData();
  return NextResponse.json(locations);
}

// 2. POST/DELETE Management Requests: Modifies the list based on admin dashboard actions
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let currentData = readData();

    if (body.action === "delete") {
      // Filter out the city you want to remove
      currentData = currentData.filter((loc: any) => loc.city !== body.city);
      writeData(currentData);
      return NextResponse.json({ success: true, message: "Location deleted" });
    }

    // Otherwise, treat it as adding a new location
    const newLocation = {
      id: Date.now().toString(),
      city: body.city,
      province: body.province,
      events: body.events || "0+",
    };
    currentData.push(newLocation);
    writeData(currentData);

    return NextResponse.json({ success: true, data: newLocation });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update database" }, { status: 500 });
  }
}