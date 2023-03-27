const taskContainer = document.querySelector(".task-container");
const topContainer = document.querySelector(".container");

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createProjectElements(currentProject) {
  const project = document.createElement("div");
  project.className = "sidebar-project";
  project.textContent = currentProject.name;
  project.setAttribute("data-projectID", currentProject.projectUuid);
  topContainer.appendChild(project);
  // edit button (for now)
  const editButton = document.createElement("button");
  editButton.className = "project-edit-button";
  editButton.textContent = "edit";
  editButton.setAttribute("data-taskID", currentProject.projectUuid);
  project.appendChild(editButton);
  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "project-delete-button";
  deleteButton.textContent = "delete";
  deleteButton.setAttribute("data-taskID", currentProject.projectUuid);
  project.appendChild(deleteButton);
  // disable buttons
  editButton.disabled = true;
  deleteButton.disabled = true;
}

function renderProjects(vaultProjectsArray) {
  removeChildNodes(topContainer);
  const projects = vaultProjectsArray;
  projects.forEach((project) => {
    createProjectElements(project);
  });
}

function createTaskElement(taskObject) {
  // task div
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskContainer.appendChild(taskDiv);
  // checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("data-taskID", taskObject.taskUuid);
  taskDiv.appendChild(checkbox);
  // task
  const task = document.createElement("p");
  task.textContent = taskObject.task;
  task.className = "task-name";
  taskDiv.appendChild(task);
  // due
  const dueDate = document.createElement("div");
  dueDate.className = "task-date";
  dueDate.textContent = taskObject.dueDate;
  taskDiv.appendChild(dueDate);
  // edit button (for now)
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.textContent = "edit";
  editButton.setAttribute("data-taskID", taskObject.taskUuid);
  taskDiv.appendChild(editButton);
  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "delete";
  deleteButton.setAttribute("data-taskID", taskObject.taskUuid);
  taskDiv.appendChild(deleteButton);
}

function renderTasks(projectTasks) {
  removeChildNodes(taskContainer);
  const tasks = projectTasks;
  tasks.forEach((taskObject) => {
    createTaskElement(taskObject);
  });
}

export { renderTasks, renderProjects };
