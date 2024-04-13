import { KVStorage } from "../util/storage/KVStorage";
import { Storage } from "../util/storage/Storage";

const cloudfrareKey = process.env.CLOUDDLARE_KV_API_KEY;
const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const cloudflareKvNamespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;

if (!cloudfrareKey || !cfAccountId || !cloudflareKvNamespaceId) {
  throw new Error("Cloudflare key or account ID is missing");
}

export const storage: Storage<string> = new KVStorage<string>(
  cfAccountId,
  cloudflareKvNamespaceId,
  cloudfrareKey
);
