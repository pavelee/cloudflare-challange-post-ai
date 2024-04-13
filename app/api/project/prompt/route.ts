import { promptProject } from "@/app/action/promptProject";
import { NextRequest, NextResponse } from "next/server";

export const runtime =
  process.env.NODE_ENV === "production" ? "edge" : undefined;

export const POST = async (request: NextRequest) => {
  const { projectId, prompt } = await request.json();

  const code = await promptProject(projectId, prompt);

  return NextResponse.json({
    code,
  });
};
