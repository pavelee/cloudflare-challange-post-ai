import { getProject } from "./getProject";

export const chatPrompt = async (projectId: string, prompt: string) => {
  const project = await getProject(projectId);
  const messages = project.getMessages();
};
