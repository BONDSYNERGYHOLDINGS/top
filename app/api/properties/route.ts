import { NextRequest, NextResponse } from "next/server";
import {
  getAllProperties,
  createProperty,
  SheetProperty,
} from "@/lib/sheets";
import { verifyAdminToken, getTokenFromRequest } from "@/lib/auth";

async function requireAdmin(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyAdminToken(token);
}

// GET /api/properties — list all (public)
export async function GET() {
  try {
    const props = await getAllProperties();
    return NextResponse.json(props);
  } catch (err: any) {
    console.error("GET /api/properties error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST /api/properties — create new (admin only)
export async function POST(req: NextRequest) {
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body: SheetProperty = await req.json();

    // Generate slug id from title if not provided
    if (!body.id) {
      body.id = body.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    await createProperty(body);
    return NextResponse.json({ success: true, id: body.id }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/properties error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
