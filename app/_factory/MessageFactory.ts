import { Message, MessageType } from "../_model/Message";

export class MessageFactory {
  static createFromObject(data: MessageType): Message {
    return new Message(data.actor, data.text, data.objectId, new Date(data.date));
  }
}
