import next from "next";
import { askAI } from "./askAI";
import { getProject } from "./getProject";
import { saveProject } from "./saveProject";

export const promptProject = async (projectId: string, prompt: string) => {
  const project = await getProject(projectId);
  let finalPrompt = buildPrompt(prompt, project.getSourceCode());

  const response = await askAI(
    {
      prompt: finalPrompt,
    },
    "@hf/thebloke/openhermes-2.5-mistral-7b-awq"
  );

  project.setSourceCode(response);

  // @TODO remove
  await saveProject(project);

  return response;
};

export const buildPrompt = (prompt: string, code?: string) => {
  let nextPrompt = ``;
  if (code) {
    nextPrompt += `You are programmer assistant. Here is HTML code to edit: ${code}`;
  }
  nextPrompt += prompt;
  nextPrompt += `Return only HTML code, do not add any comments or explanations.`;
  return nextPrompt;
};
