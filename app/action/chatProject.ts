import { getProject } from "./getProject";
import { saveProject } from "./saveProject";

export const chatProject = async (projectId: string, prompt: string) => {
  const project = await getProject(projectId);
  // const messages = project.getMessages();
  project.addUserMessage(prompt);
  await saveProject(project);
  return project;
};
