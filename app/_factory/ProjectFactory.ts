import { Project, ProjectType } from "../_model/Project";
import { MessageFactory } from "./MessageFactory";

export class ProjectFactory {
  static createFromObject(data: ProjectType): Project {
    return new Project(
      data.id, 
      data.sourceCode, 
      data.messages.map((message) => MessageFactory.createFromObject(message))
    );
  }
}
