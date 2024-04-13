import { storage } from "../_config/storage";
import { Project } from "../_model/Project";

export const getProject = async (projectID: string): Promise<Project> => {
  const projectJson = await storage.get(projectID);
  const decodedProject = JSON.parse(projectJson);
  return new Project(projectID, decodedProject.sourceCode);
};
