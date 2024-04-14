import { Models } from "@/app/action/askAI";

export const AIModelUrl = (accountId: string, model: Models) => {
  return `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
};
