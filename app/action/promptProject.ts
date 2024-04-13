import { askAI } from "./askAI";
import { getProjectCode } from "./getProjectCode";

export const promptProject = async (projectId: string, prompt: string) => {
  const code = await getProjectCode(projectId);
  let finalPrompt = buildPrompt(prompt, code);

  const response = askAI(
    finalPrompt,
    "@hf/thebloke/openhermes-2.5-mistral-7b-awq"
  );

  return response;
};

export const buildPrompt = (prompt: string, code?: string) => {
  let nextPrompt = ``;
  if (code) {
    nextPrompt += `You are programmer assistant. Here is HTML code to edit: ${code}`;
  }
  nextPrompt += prompt;
  nextPrompt += ` Add only inline css. Return only changed HTML code, do not add any comments or explanations.`;
  return nextPrompt;
};
