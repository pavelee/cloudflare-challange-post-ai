import { storage } from "../_config/storage";

export const saveProject = async (
  projectID: string,
  sourceCode: string
) => {
  await storage.set(projectID, sourceCode);
};
