export type ProjectType = {
  id: string;
  sourceCode: string;
};

export class Project {
  public constructor(private id: string, private sourceCode: string) {}

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
    };
  }
}
