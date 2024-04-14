import { ModelsFactory } from "../_factory/ModelsFactory";
import { ProjectFactory } from "../_factory/ProjectFactory";
import { Project } from "../_model/Project";
import { generateProjectID } from "../util/generateProjectID";
import { defaultModel } from "./askAI";
import { saveProject } from "./saveProject";

const startingMessageFromSystem = `Hey! I am helpfull AI assistant. I am here to help you with writing your post. Just ask me anything!`;

const startingContent = `# What are we going to write about today? 🤓`;

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
  // @TODO move to factory
  const project = new Project(
    projectID,
    startingContent,
    ModelsFactory.createFromObject({
      chatModel: defaultModel,
    }),
    []
  );
  project.addSystemMessage(startingMessageFromSystem);
  await saveProject(project);
  return ProjectFactory.createFromObject(project.toObject());
};
