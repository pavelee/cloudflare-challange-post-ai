import { summaryContent } from "@/app/action/summaryContent";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export const POST = async (request: NextRequest) => {
  const { content } = await request.json();
  const summary = await summaryContent(content);
  return NextResponse.json({
    summary,
  });
};
