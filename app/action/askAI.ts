"use server";

const defaultModel = "@cf/meta/llama-2-7b-chat-fp16";

type Models =
  | "@cf/meta/llama-2-7b-chat-fp16"
  | "@hf/thebloke/deepseek-coder-6.7b-base-awq"
  | "@hf/thebloke/openhermes-2.5-mistral-7b-awq";

export const askAI = async (prompt: any, model: Models = defaultModel) => {
  const cloudfrareKey = process.env.CLOUDFLARE_API_KEY;
  const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  const input = {
    max_tokens: 580,
    prompt: prompt,
  };

  // @TODO FIX IT
  const p = prompt;

  const req = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/${model}`,
    {
      method: "POST",
      body: JSON.stringify(p),
      headers: {
        Authorization: `Bearer ${cloudfrareKey}`,
      },
    }
  );
  const res = await req.json();
  console.log(res);
  const response = res.result.response;

  return response;
};
