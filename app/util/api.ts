import { ProjectType } from "../_model/Project";
import { Models } from "../action/askAI";

type getProjectIn = {
  projectId: string;
};

type getProjectOut = ProjectType;

type saveProjectIn = {
  sourceCode?: string;
  chatModel?: Models;
};

type saveProjectOut = getProjectOut;

type promptProjectIn = {
  projectId: string;
  prompt: string;
};

type promptProjectOut = {
  code: string;
};

export class API {
  static async createProject(projectName: string) {
    const response = await fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectName }),
    });
    return response.json();
  }

  static async getProject(data: getProjectIn): Promise<getProjectOut> {
    const response = await fetch(`/api/project?projectID=${data.projectId}`, {
      method: "GET",
      cache: "no-cache",
    });
    return await response.json();
  }

  static async saveProject(
    projectId: string,
    data: saveProjectIn
  ): Promise<saveProjectOut> {
    const response = await fetch(`/api/project?projectID=${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  static async promptProject(data: promptProjectIn): Promise<promptProjectOut> {
    const response = await fetch(`/api/project/prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  static async chatProject(projectId: string, prompt: string, model?: Models) {
    const response = await fetch(`/api/project/${projectId}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, chatModel: model }),
    });
    return response.json();
  }
}
