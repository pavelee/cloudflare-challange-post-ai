import { Project, ProjectType } from "../_model/Project";

export class ProjectFactory {
  static createFromObject(data: ProjectType): Project {
    return new Project(data.id, data.sourceCode);
  }
}
