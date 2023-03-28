export default class Task {
  constructor([task, description, dueDate, priority, project]) {
    this.task = task;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.taskUuid = new Date().getTime().toString()
    this.projectUuid = project;
  }
}