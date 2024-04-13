import { storage } from "../_config/storage";
import { Project } from "../_model/Project";
import { generateProjectID } from "../util/generateProjectID";
import { saveProject } from "./saveProject";

/**
 * function that will create project ID and coresponding file with project's source code on the disk
 * project ID must be unique, should be based on passed projectName and unique salt, projectName should be cleaned from any special characters
 * project should be saved in separate directory in projectsDir, with project ID as directory name
 * source code will be always HTML code
 * @param projectName name of the project
 * @param projectsDir directory where projects will be saved
 */
export const createProject = async (projectName: string): Promise<Project> => {
  const projectID = generateProjectID(projectName);
  const project = new Project(projectID, "");
  await saveProject(project);
  return new Project(projectID, "");
};
