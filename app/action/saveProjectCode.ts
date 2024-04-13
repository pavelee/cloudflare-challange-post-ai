import { storage } from "../_config/storage";

export const saveProjectCode = async (
  projectID: string,
  sourceCode: string
) => {
  await storage.set(projectID, sourceCode);
};
