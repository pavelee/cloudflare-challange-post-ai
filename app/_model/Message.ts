export type ActorType = "system" | "user";

export type MessageType = {
  actor: ActorType;
  text: string;
  objectId: string;
  date: Date;
};

export class Message {
  public constructor(
    private actor: ActorType,
    private text: string,
    private objectId: string = "",
    private date: Date = new Date()
  ) {}

  getActor(): ActorType {
    return this.actor;
  }

  getText(): string {
    return this.text;
  }

  setText(text: string): void {
    this.text = text;
  }

  getObjectId(): string {
    return this.objectId;
  }

  setObjectId(objectId: string): void {
    this.objectId = objectId;
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date;
  }

  toObject(): MessageType {
    return {
      actor: this.actor,
      text: this.text,
      objectId: this.objectId,
      date: this.date,
    };
  }
}
