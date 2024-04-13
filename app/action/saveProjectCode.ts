import fs from "fs";

export const saveProjectCode = async (
  projectID: string,
  sourceCode: string
) => {
  const file = `./app/projects/${projectID}/index.html`;
  fs.writeFileSync(file, sourceCode);
};
