import { Message, MessageType } from "./Message";
import { Models, ModelsType } from "./Models";
import { Models as ModelsAI } from "../action/askAI";

export type ProjectType = {
  id: string;
  sourceCode: string;
  messages: MessageType[];
  models: ModelsType;
};

export class Project {
  public constructor(
    private id: string,
    private sourceCode: string,
    private models: Models,
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

  getChatModel(): ModelsAI {
    return this.models.getChatModel() as ModelsAI;
  }

  setChatModel(chatModel: ModelsAI): void {
    this.models.setChatModel(chatModel);
  }

  toObject(): ProjectType {
    return {
      id: this.id,
      sourceCode: this.sourceCode,
      messages: this.messages.map((message) => message.toObject()),
      models: this.models.toObject(),
    };
  }
}
