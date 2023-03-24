export default class Project {
  constructor(name) {
    this.name = name;
    this.projectTasks = [];
  }

  set tasks(add) {
    this.projectTasks.push(add);
  }
  
}
