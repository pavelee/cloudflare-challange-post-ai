import { createProject } from "@/app/action/createProject";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { projectName } = await req.json();

  const project = await createProject(projectName);

  return NextResponse.json({
    projectID: project,
  });
};
