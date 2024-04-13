import { storage } from "../_config/storage";
import { Project } from "../_model/Project";

export const saveProject = async (project: Project) => {
  await storage.set(project.getID(), JSON.stringify(project.toObject()));
};
