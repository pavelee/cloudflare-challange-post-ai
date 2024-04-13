import fs from "fs";

export const getProjectCode = async (projectID: string) => {
  const projectDir = `./app/projects/${projectID}`;
  const sourceCode = fs.readFileSync(`${projectDir}/index.html`, {
    encoding: "utf-8",
  });

  return sourceCode;
};
