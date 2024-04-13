import { createProject } from "@/app/action/createProject";
import { getProject } from "@/app/action/getProject";
// import { getProjectCode } from "@/app/action/getProjectCode";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const projectID = searchParams.get("projectID");

  if (!projectID) {
    return NextResponse.json(
      {
        error: "Project ID is required",
      },
      { status: 400 }
    );
  }

  const project = await getProject(projectID);

  return NextResponse.json(project.toObject());
};

export const POST = async (req: NextRequest) => {
  const { projectName } = await req.json();

  const project = await createProject(projectName);

  return NextResponse.json(project.toObject());
};
