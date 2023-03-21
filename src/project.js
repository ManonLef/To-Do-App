export default class Project {
  constructor(name) {
    this.name = name;
    this.projectTasks = [];
  }

  get tasks() {
    return this.projectTasks;
  }

  set tasks(add) {
    this.projectTasks.push(add);
  }

  get projectName() {
    return this.name;
  }
  
  set projectName(newName) {
    this.name = newName;
  }
}
