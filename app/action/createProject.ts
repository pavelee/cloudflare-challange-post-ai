import fs from "fs";

/**
 * function that will create project ID and coresponding file with project's source code on the disk
 * project ID must be unique, should be based on passed projectName and unique salt, projectName should be cleaned from any special characters
 * project should be saved in separate directory in projectsDir, with project ID as directory name
 * source code will be always HTML code
 * @param projectName name of the project
 * @param projectsDir directory where projects will be saved
 */
export const createProject = async (
  projectName: string,
  projectsDir: string
) => {
  const projectID = generateProjectID(projectName);

  const projectDir = `${projectsDir}/${projectID}`;
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir);
  } else {
    throw new Error("Project already exists");
  }

  const sourceCode = ``;

  fs.writeFileSync(`${projectDir}/index.html`, sourceCode);
  return projectID;
};

const generateSalt = () => {
  return Math.random().toString(36).substring(7);
};

const generateProjectID = (projectName: string) => {
  const salt = generateSalt();
  const cleanedProjectName = projectName.replace(/[^a-zA-Z0-9]/g, "");
  const projectID = `${cleanedProjectName}-${salt}`;
  return projectID;
};
