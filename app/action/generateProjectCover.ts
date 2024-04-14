import { Models, askAI, defaultImageModel } from "./askAI";
import { summaryContent } from "./summaryContent";

export const generateProjectCover = async (
  content: string,
  context?: string,
  model?: Models
) => {
  const summary = await summaryContent(content);

  let prompt = `
        Here is a summary of the article:
        ${summary}
        What cover would you like to give to this article?
        Do not add any text to the cover.
        It should be in size 1200x630 pixels.
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
    model ? model : defaultImageModel
  );

  return result;
};
