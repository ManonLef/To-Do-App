export default class Project {
  constructor(name) {
    this.name = name;
    this.projectTasks = [];
    this.projectUuid = new Date().getTime().toString()
  }

  set tasks(add) {
    this.projectTasks.push(add);
  }
  
}
