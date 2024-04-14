import { Message } from "postcss";
import { MessageType } from "./Message";

export type ProjectType = {
  id: string;
  sourceCode: string;
  messages: MessageType[];
};

export class Project {
  public constructor(
    private id: string,
    private sourceCode: string,
    private messages: Message[] = []
  ) {}

  getID(): string {
    return this.id;
  }

  getSourceCode(): string {
    return this.sourceCode;
  }

  setSourceCode(sourceCode: string): void {
    this.sourceCode = sourceCode;
  }

  toObject(): ProjectType {
    return {
      id: this.id,
      sourceCode: this.sourceCode,
      messages: this.messages.map((message) => message.toObject()),
    };
  }
}
