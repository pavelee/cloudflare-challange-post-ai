import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export const runtime = "edge";

export const GET = async (request: NextRequest) => {
  const cook = cookies();
  const time = new Date().getTime();
  const cloudfrareKey = process.env.CLOUDFLARE_API_KEY;
  const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt") ?? "spiderman";

  const req = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/@cf/lykon/dreamshaper-8-lcm`,
    {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt
      }),
      headers: {
        Authorization: `Bearer ${cloudfrareKey}`,
      },
    }
  );
  const res = await req.blob();

  console.log(res);

  return new Response(res, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
};
