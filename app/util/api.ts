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
}
