export default class Vault {
  constructor(name) {
    this.name = name;
    this.projects = [];
  }

  set newProject(project) {
    this.projects.push(project);
  }
}