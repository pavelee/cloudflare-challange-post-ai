import { ModelsFactory } from "../_factory/ModelsFactory";
import { ProjectFactory } from "../_factory/ProjectFactory";
import { Project } from "../_model/Project";
import { generateProjectID } from "../util/generateProjectID";
import { defaultModel } from "./askAI";
import { saveProject } from "./saveProject";

const startingMessageFromSystem = `Hey! I am helpfull AI assistant. I am here to help you with writing your post. Just ask me anything!`;

const startingContent = `
# Hello! Welcome to your new project!

## How to use this editor?

This editor is using markdown syntax. You can write your content in markdown and see the preview after switching to the preview mode and back to the editor mode.

## What is markdown?

Markdown is a lightweight markup language with plain-text-formatting syntax. Its design allows it to be converted to many output formats, but the original tool by the same name only supports HTML. Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## How AI could help you?

### AI Assistant

You can ask AI to generate some text for you. Just click on the AI Assistant button and ask AI for help.

### AI Title Generator

You can ask AI to generate a title for your post. Just click on the AI Title Generator button.

### AI Cover Image Generator

You can ask AI to generate a cover image for your post. Just click on the AI Cover Image Generator button.

### How to use AI responsibly?

AI is your assistant, you are in charge. AI is a neutral tool, it depends on you how you use it. AI can help you with generating ideas, but you are the one who decides what to do with them.
`;

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
