const taskContainer = document.querySelector(".task-container");

function createTaskElement(taskObject) {

  // task div
  const task = document.createElement("div");
  task.className = "task-basis";
  task.textContent = taskObject.task;
  taskContainer.appendChild(task);
  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "del";
  deleteButton.setAttribute("data-taskID", taskObject.taskUuid);
  task.appendChild(deleteButton);
  // listeners
}

// function deleteTask() {
//   const id = this.getAttribute("data-taskID")
//   removeTask(id);
// }

function removeTasks() {
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.firstChild)
  }
}

function renderTasks(projectArray) {
  removeTasks()
  const tasks = projectArray;
  tasks.forEach((taskObject) => {
    createTaskElement(taskObject);
  });
}



export {renderTasks}
