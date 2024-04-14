export interface Storage<T> {
  get: (key: string) => Promise<T>;
  set: (key: string, value: string) => Promise<void>;
  remove: (key: string) => Promise<void>;
}
