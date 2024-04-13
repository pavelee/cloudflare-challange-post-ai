export type ProjectType = {
  id: string;
  sourceCode: string;
};

export class Project {
  public constructor(private id: string, private sourceCode: string) {}

  getID(): string {
    return this.id;
  }

  toObject(): ProjectType {
    return {
      id: this.id,
      sourceCode: this.sourceCode,
    };
  }
}
