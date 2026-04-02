import { NextRequest, NextResponse } from "next/server";
import { PrebookFormData } from "@/types/prebook";

export async function POST(request: NextRequest) {
  try {
    const body: PrebookFormData = await request.json();

    // Validate required fields
    const { productId, customerName, customerEmail, customerPhone, mode, quantity } = body;
    if (!productId || !customerName || !customerEmail || !customerPhone || !mode || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields: productId, customerName, customerEmail, customerPhone, mode, quantity" },
        { status: 400 }
      );
    }

    if (!["wholesale", "retail"].includes(mode)) {
      return NextResponse.json({ error: "Invalid mode. Must be 'wholesale' or 'retail'." }, { status: 400 });
    }

    // In production, save to PostgreSQL via Prisma:
    // const prebook = await prisma.prebookRequest.create({
    //   data: { productId, customerName, customerEmail, customerPhone, mode, quantity, message: body.message || null, status: "pending" },
    // });
    // return NextResponse.json({ success: true, requestId: prebook.id });

    // For demo: simulate save
    const requestId = `prebook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log("Prebook request received:", { ...body, requestId });

    return NextResponse.json({ success: true, requestId });
  } catch (error) {
    console.error("Prebook API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
