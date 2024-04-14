import { Models as ModelsAI } from "../action/askAI";

export type ModelsType = {
  chatModel: ModelsAI;
};

export class Models {
  public constructor(private chatModel: ModelsAI) {}

  getChatModel(): ModelsAI {
    return this.chatModel;
  }

  setChatModel(chatModel: ModelsAI): void {
    this.chatModel = chatModel;
  }

  toObject(): ModelsType {
    return {
      chatModel: this.chatModel,
    };
  }
}
