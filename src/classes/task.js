export default class Task {
  constructor([checked, task, dueDate, priority, project, description]) {
    this.checked = checked
    this.task = task;
    this.dueDate = dueDate;
    this.priority = priority;
    this.taskUuid = new Date().getTime().toString()
    this.projectUuid = project;
    this.description = description;
  }
}