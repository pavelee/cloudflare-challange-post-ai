import { askAI, defaultModel } from "./askAI";
import { summaryContent } from "./summaryContent";

export const generateProjectTitle = async (
  content: string,
  context?: string
) => {
  const summary = await summaryContent(content);

  let prompt = `
    Here is a summary of the article:
    ${summary}
    What title would you like to give to this article?
  `;

  if (context) {
    prompt += `
        ${context}
    `;
  }

  const result = await askAI(
    {
      prompt: prompt,
    },
    defaultModel
  );

  return result;
};
