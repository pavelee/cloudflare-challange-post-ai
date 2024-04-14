import { chatProject } from "@/app/action/chatProject";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type Props = {
  params: {
    project_id: string;
  };
};

export const POST = async (request: NextRequest, props: Props) => {
  const { project_id } = props.params;
  const { prompt } = await request.json();

  const project = await chatProject(project_id, prompt);

  return NextResponse.json(project.toObject());
};
