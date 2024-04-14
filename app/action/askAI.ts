import { AIModelUrl } from "../util/cf/AIModelUrl";

export type ImageModels = "@cf/lykon/dreamshaper-8-lcm"
// | "@cf/runwayml/stable-diffusion-v1-5-img2img" // not working 😭
// | "@cf/runwayml/stable-diffusion-v1-5-inpainting" // not working 😭
| "@cf/stabilityai/stable-diffusion-xl-base-1.0"
| "@cf/bytedance/stable-diffusion-xl-lightning";

export type Models =
  | "@cf/meta/llama-2-7b-chat-fp16"
  | "@hf/thebloke/openhermes-2.5-mistral-7b-awq"
  | "@cf/facebook/bart-large-cnn"
  | "@cf/mistral/mistral-7b-instruct-v0.1"
  | "@cf/tiiuae/falcon-7b-instruct"
  | "@cf/google/gemma-2b-it-lora"
  | "@hf/nousresearch/hermes-2-pro-mistral-7b"
  | "@hf/thebloke/llama-2-13b-chat-awq"
  | "@cf/qwen/qwen1.5-14b-chat-awq"
  | ImageModels;

export const availableModels: Models[] = [
  "@cf/meta/llama-2-7b-chat-fp16",
  "@hf/thebloke/openhermes-2.5-mistral-7b-awq",
  "@cf/mistral/mistral-7b-instruct-v0.1",
  "@cf/tiiuae/falcon-7b-instruct",
  "@cf/google/gemma-2b-it-lora",
  "@hf/nousresearch/hermes-2-pro-mistral-7b",
  "@hf/thebloke/llama-2-13b-chat-awq",
  "@cf/qwen/qwen1.5-14b-chat-awq",
];

export const imageGenerationModels: Models[] = [
  "@cf/lykon/dreamshaper-8-lcm",
  // "@cf/runwayml/stable-diffusion-v1-5-img2img",
  // "@cf/runwayml/stable-diffusion-v1-5-inpainting",
  "@cf/stabilityai/stable-diffusion-xl-base-1.0",
  "@cf/bytedance/stable-diffusion-xl-lightning"
];

export const defaultModel: Models = "@hf/nousresearch/hermes-2-pro-mistral-7b";

export const defaultImageModel: Models = "@cf/lykon/dreamshaper-8-lcm";

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

  if (imageGenerationModels.includes(model)) {
    const res = await req.blob();
    return res;
  }

  const res = await req.json();

  if (res.result.summary) {
    return res.result.summary;
  }
  const response = res.result.response;

  return response;
};
