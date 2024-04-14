import { generateProjectCover } from "@/app/action/generateProjectCover";
import { summaryContent } from "@/app/action/summaryContent";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export const POST = async (request: NextRequest) => {
  const { content, context, model } = await request.json();
  const response = await generateProjectCover(content, context, model);

  return new Response(response, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
};
