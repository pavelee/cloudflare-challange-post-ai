"use server";

export const askAI = async (prompt: string) => {
  const cloudfrareKey = process.env.CLOUDFLARE_API_KEY;
  const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  const input = {
    max_tokens: 256,
    prompt: prompt,
  };

  const req = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/@cf/meta/llama-2-7b-chat-fp16`,
    {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        Authorization: `Bearer ${cloudfrareKey}`,
      },
    }
  );
  const res = await req.json();
  const response = res.result.response;

  return response;
};
