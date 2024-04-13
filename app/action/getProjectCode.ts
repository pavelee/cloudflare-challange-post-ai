import { storage } from "../_config/storage";

export const getProjectCode = async (projectID: string) => {
  const sourceCode = await storage.get(projectID);
  return sourceCode;
};
