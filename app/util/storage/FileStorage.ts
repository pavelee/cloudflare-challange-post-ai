import { Storage } from "./Storage";
import fs from "fs";

export class FileStorage<T> implements Storage<T> {
  public constructor(private storageDirectory: string) {}

  public async get(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      fs.readFile(`${this.storageDirectory}/${key}`, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data as T);
        }
      });
    });
  }

  public async set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${this.storageDirectory}/${key}`, value, (err) => {
        if (err) {
          reject(err);
        } else {
          //   resolve(null);
        }
      });
    });
  }

  public async remove(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(`${this.storageDirectory}/${key}`, (err) => {
        if (err) {
          reject(err);
        } else {
          //   resolve(null);
        }
      });
    });
  }
}
