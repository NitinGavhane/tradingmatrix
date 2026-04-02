import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { createFuseInstance, getSearchSuggestions } from "@/lib/search-utils";

const fuse = createFuseInstance(MOCK_PRODUCTS);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q || q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  const suggestions = getSearchSuggestions(fuse, q, 10);
  return NextResponse.json({ suggestions });
}
