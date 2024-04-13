import next from "next";
import { askAI } from "./askAI";
import { getProjectCode } from "./getProjectCode";
import { saveProjectCode } from "./saveProjectCode";

export const promptProject = async (projectId: string, prompt: string) => {
  const code = await getProjectCode(projectId);
  let finalPrompt = buildPrompt(prompt, code);

  const response = await askAI(
    finalPrompt,
    "@hf/thebloke/openhermes-2.5-mistral-7b-awq"
  );

  // @TODO remove
  await saveProjectCode(projectId, response);

  return response;
};

export const buildPrompt = (prompt: string, code?: string) => {
  let nextPrompt = ``;
  if (code) {
    nextPrompt += `You are programmer assistant. Here is HTML code to edit: ${code}`;
  }
  nextPrompt += prompt;
  nextPrompt += `Return only HTML code, do not add any comments or explanations.`;
  nextPrompt += `minify the code and remove all comments. Make sure it is as small as possible.`;
  return nextPrompt;
};
