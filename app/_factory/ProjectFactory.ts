import { Project, ProjectType } from "../_model/Project";
import { MessageFactory } from "./MessageFactory";
import { ModelsFactory } from "./ModelsFactory";

export class ProjectFactory {
  static createFromObject(data: ProjectType): Project {
    return new Project(
      data.id, 
      data.sourceCode, 
      ModelsFactory.createFromObject(data.models),
      data.messages.map((message) => MessageFactory.createFromObject(message))
    );
  }
}
