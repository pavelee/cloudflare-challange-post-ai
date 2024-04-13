import { generateSalt } from "./generateSalt";

export const generateProjectID = (projectName: string) => {
  const salt = generateSalt();
  const cleanedProjectName = projectName.replace(/[^a-zA-Z0-9]/g, "");
  const projectID = `${cleanedProjectName}-${salt}`;
  return projectID;
};