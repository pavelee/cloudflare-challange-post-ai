import { Storage } from "./Storage";

export class KVStorage<T> implements Storage<T> {
  public constructor(
    private accountId: string,
    private namespaceId: string,
    private key: string,
    private baseUrl: string = "https://api.cloudflare.com/client/v4"
  ) {}

  public async get(key: string): Promise<T> {
    let url = `${this.baseUrl}/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${key}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.key}`,
      },
    });
    let data = await response.json();
    return data.value;
  }

  public async set(key: string, value: any): Promise<void> {
    let url = `${this.baseUrl}/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${key}`;
    const respose = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: value,
        metadata: {
          someMetadataKey: "someMetadataValue",
        },
      }),
    });
    if (!respose.ok) {
      throw new Error(`Failed to set value: ${respose.status}`);
    }
    if (respose.status !== 200) {
      throw new Error(`Failed to set value: ${respose.status}`);
    }
  }

  public async remove(key: string): Promise<void> {
    let url = `${this.baseUrl}/accounts/${this.accountId}/storage/kv/namespaces/${this.namespaceId}/values/${key}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.key}`,
      },
    });
  }
}
