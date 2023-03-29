const taskContainer = document.querySelector(".task-container");
const topContainer = document.querySelector(".container");
const body = document.querySelector("body");
function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function projectForm() {
  const newProjectForm = document.createElement("form");

  const newProjectDiv = document.createElement("div");
  newProjectDiv.className = "project";

  const label = document.createElement("label");
  label.setAttribute("for", "project");
  label.textContent = "project";

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "project");
  input.setAttribute("id", "project");

  const submit = document.createElement("button")
  submit.setAttribute("type", "submit")
  submit.setAttribute("class", "add-project-form")
  submit.textContent = "add project noob"

  body.appendChild(newProjectForm)
  newProjectDiv.append(label, input)
  newProjectForm.append(newProjectDiv, submit)
}

projectForm()

function createProjectElements(currentProject) {
  const projectDiv = document.createElement("div");
  projectDiv.className = "sidebar-project";
  topContainer.appendChild(projectDiv);
  // edit button (for now)
  const projectName = document.createElement("p");
  projectName.className = "project-name";
  projectName.textContent = currentProject.name;
  projectName.setAttribute("data-projectID", currentProject.projectUuid);
  projectDiv.appendChild(projectName);

  const editButton = document.createElement("button");
  editButton.className = "project-edit-button";
  editButton.textContent = "edit";
  editButton.setAttribute("data-projectID", currentProject.projectUuid);
  projectDiv.appendChild(editButton);
  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "project-delete-button";
  deleteButton.textContent = "delete";
  deleteButton.setAttribute("data-projectID", currentProject.projectUuid);
  projectDiv.appendChild(deleteButton);
  // disable buttons
  editButton.disabled = true;
  deleteButton.disabled = false;
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
  projectTasks.forEach((taskObject) => {
    createTaskElement(taskObject);
  });
}

function renderProjects(vaultProjectsArray) {
  removeChildNodes(topContainer);
  const projects = vaultProjectsArray;
  projects.forEach((project) => {
    createProjectElements(project);
  });
}

export default function renderCurrent(allProjects, currentProjectTasks) {
  renderProjects(allProjects);
  renderTasks(currentProjectTasks);
}
