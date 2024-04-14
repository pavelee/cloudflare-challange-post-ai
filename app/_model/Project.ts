import { Message, MessageType } from "./Message";

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

  getMessages(): Message[] {
    return this.messages;
  }

  addSystemMessage(message: string): void {
    this.messages.push(new Message("system", message));
  }

  addUserMessage(message: string): void {
    this.messages.push(new Message("user", message));
  }

  toObject(): ProjectType {
    return {
      id: this.id,
      sourceCode: this.sourceCode,
      messages: this.messages.map((message) => message.toObject()),
    };
  }
}
