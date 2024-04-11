import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export const runtime = "edge";

export const GET = async (request: NextRequest) => {
  const cook = cookies();
  const time = new Date().getTime();
  const cloudfrareKey = process.env.CLOUDFLARE_API_KEY;
  const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt") ?? "Hello!";

  const input = {
    max_tokens: 256,
    prompt: prompt,
  };

  const input1 = {
    max_tokens: 256,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  }

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

  return Response.json(res);
};
