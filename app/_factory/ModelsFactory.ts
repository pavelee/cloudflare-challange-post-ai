import { Models, ModelsType } from "../_model/Models";

export class ModelsFactory {
  static createFromObject(data: ModelsType): Models {
    return new Models(data.chatModel);
  }
}
