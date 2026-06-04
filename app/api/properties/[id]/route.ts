import { NextRequest, NextResponse } from "next/server";
import {
  getPropertyById,
  updateProperty,
  deleteProperty,
  SheetProperty,
} from "@/lib/sheets";
import { verifyAdminToken, getTokenFromRequest } from "@/lib/auth";

async function requireAdmin(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyAdminToken(token);
}

interface Params { params: Promise<{ id: string }> }

// GET /api/properties/[id] — public
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const property = await getPropertyById(id);
    if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(property);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/properties/[id] — admin only
export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body: SheetProperty = await req.json();
    await updateProperty(id, body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE /api/properties/[id] — admin only
export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const session = await requireAdmin(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await deleteProperty(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
