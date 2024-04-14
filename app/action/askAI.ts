import { AIModelUrl } from "../util/cf/AIModelUrl";

export type Models =
  | "@cf/meta/llama-2-7b-chat-fp16"
  | "@hf/thebloke/deepseek-coder-6.7b-base-awq"
  | "@hf/thebloke/openhermes-2.5-mistral-7b-awq"
  | "@cf/facebook/bart-large-cnn";

export const availableModels: Models[] = [
  "@cf/meta/llama-2-7b-chat-fp16",
  "@hf/thebloke/deepseek-coder-6.7b-base-awq",
  "@hf/thebloke/openhermes-2.5-mistral-7b-awq",
];

export const defaultModel: Models =
  "@hf/thebloke/openhermes-2.5-mistral-7b-awq";

export const summaryModel: Models = "@cf/facebook/bart-large-cnn";

export type BasicPrompt = {
  prompt: string;
  max_tokens?: number;
};

export type ChatPrompt = {
  messages: { role: string; content: string }[];
};

export type SummaryPrompt = {
  input_text: string;
  max_length?: number;
};

export type Prompt = BasicPrompt | ChatPrompt | SummaryPrompt;

export const askAI = async (prompt: Prompt, model: Models = defaultModel) => {
  const cloudfrareKey = process.env.CLOUDFLARE_API_KEY;
  const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  if (!cloudfrareKey) {
    throw new Error("CLOUDFLARE_API_KEY is not set in .env file");
  }

  if (!cfAccountId) {
    throw new Error("CLOUDFLARE_ACCOUNT_ID is not set in .env file");
  }

  if ("prompt" in prompt) {
    if (!prompt.max_tokens) {
      prompt.max_tokens = 580;
    }
  }

  const url = AIModelUrl(cfAccountId, model);

  const req = await fetch(url, {
    method: "POST",
    body: JSON.stringify(prompt),
    headers: {
      Authorization: `Bearer ${cloudfrareKey}`,
    },
  });
  const res = await req.json();

  if (res.result.summary) {
    return res.result.summary;
  }
  const response = res.result.response;

  return response;
};
