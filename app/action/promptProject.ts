import next from "next";
import { askAI } from "./askAI";
import { getProject } from "./getProject";
import { saveProject } from "./saveProject";

export const promptProject = async (projectId: string, prompt: string) => {
  const code = await getProject(projectId);
  let finalPrompt = buildPrompt(prompt, code);

  const response = await askAI(
    finalPrompt,
    "@hf/thebloke/openhermes-2.5-mistral-7b-awq"
  );

  // @TODO remove
  await saveProject(projectId, response);

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
