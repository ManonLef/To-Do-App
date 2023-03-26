const taskContainer = document.querySelector(".task-container");
const topContainer = document.querySelector(".container")


function createProjectElements(currentProject) {
  const project = document.createElement("div");
  project.className = "sidebar-project";
  project.textContent = currentProject.name;
  project.setAttribute("data-projectID", currentProject.projectUuid)
  topContainer.appendChild(project);
}

function renderProjects(vaultProjectsArray) {
  removeChildNodes(topContainer)
  const projects = vaultProjectsArray;
  projects.forEach((project) => {
    createProjectElements(project)
  })
}

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
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderTasks(projectArray) {
  removeChildNodes(taskContainer);
  const tasks = projectArray;
  tasks.forEach((taskObject) => {
    createTaskElement(taskObject);
  });
}

export { renderTasks, renderProjects };
