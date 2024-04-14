import { Models, askAI } from "./askAI";
import { getProject } from "./getProject";
import { saveProject } from "./saveProject";

export const chatProject = async (projectId: string, prompt: string, model: Models) => {
  const project = await getProject(projectId);
  // const messages = project.getMessages();
  project.addUserMessage(prompt);

  const finalPrompt: any = [];
  project.getMessages().forEach((message) => {
    finalPrompt.push({
      role: message.getActor(),
      content: message.getText() ?? "",
    });
  });

  const p = {
    messages: finalPrompt,
  };

  const response = await askAI(p, model);

  project.addSystemMessage(response);

  await saveProject(project);

  // await saveProject(project);
  return project;
};
