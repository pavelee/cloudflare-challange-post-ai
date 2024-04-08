import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = (request: NextRequest) => {
  const cook = cookies();
  const time = new Date().getTime();
  return new Response(`Hello, ${cook.get("name") || "world"}! ${time}`);
};
