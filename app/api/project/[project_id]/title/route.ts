import { generateProjectTitle } from "@/app/action/generateProjectTitle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { content, context } = await request.json();

  const result = await generateProjectTitle(content, context);

  return NextResponse.json(result);
};
