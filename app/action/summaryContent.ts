import { askAI, summaryModel } from "./askAI";

export const summaryContent = async (content: string) => {
  const summary = await askAI(
    {
      input_text: content,
    },
    summaryModel
  );
  return summary;
};
