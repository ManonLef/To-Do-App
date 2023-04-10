export default class Task {
  constructor([checked, task, dueDate, priority, project]) {
    this.checked = checked
    this.task = task;
    this.dueDate = dueDate;
    this.priority = priority;
    this.taskUuid = new Date().getTime().toString()
    this.projectUuid = project;
  }
}