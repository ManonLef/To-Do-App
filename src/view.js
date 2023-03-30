const body = document.querySelector("body");

const projectElement = document.createElement("div");
projectElement.className = "project-sidebar";
body.appendChild(projectElement);

const projectContainer = document.createElement("div");
projectContainer.className = "project-container";
projectElement.appendChild(projectContainer);

const taskElement = document.createElement("div");
taskElement.className = "task-element";
body.appendChild(taskElement);

const taskContainer = document.createElement("div");
taskContainer.className = "task-container";
taskElement.appendChild(taskContainer);

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function showTaskForm() {
  document.querySelector(".task-form").removeAttribute("hidden");
}

function hideTaskForm() {
  document.querySelector(".task-form").setAttribute("hidden", "true");
}

function showTaskIcon() {
  document
    .querySelector(".add-task-icon-container")
    .removeAttribute("hidden");
}

function hideTaskIcon() {
  document
  .querySelector(".add-task-icon-container")
  .setAttribute("hidden", "true");
}

function taskForm() {
  const newTaskForm = document.createElement("form");
  newTaskForm.className = "task-form"
  newTaskForm.setAttribute("hidden", 'true')

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const taskLabel = document.createElement("label");
  taskLabel.setAttribute("for", "task");
  taskLabel.textContent = "task";

  const inputTask = document.createElement("input");
  inputTask.setAttribute("type", "text");
  inputTask.setAttribute("name", "task");
  inputTask.id = "task"; // check

  const dueDiv = document.createElement("div");
  dueDiv.className = "due-date";

  const dueLabel = document.createElement("label");
  dueLabel.setAttribute("for", "due-date");
  dueLabel.textContent = "due";

  const inputDue = document.createElement("input");
  inputDue.setAttribute("type", "date");
  inputDue.setAttribute("name", "due-date");
  inputDue.id = "due-date"; // check

  const priorityDiv = document.createElement("div");
  priorityDiv.className = "priority";

  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.textContent = "priority";

  const prioritySelect = document.createElement("select");
  prioritySelect.setAttribute("name", "priority");
  prioritySelect.id = "priority";

  const priorityOptionOne = document.createElement("option");
  priorityOptionOne.setAttribute("value", "low");
  priorityOptionOne.textContent = "low";

  const priorityOptionTwo = document.createElement("option");
  priorityOptionTwo.setAttribute("value", "medium");
  priorityOptionTwo.textContent = "medium";

  const priorityOptionThree = document.createElement("option");
  priorityOptionThree.setAttribute("value", "high");
  priorityOptionThree.textContent = "high";

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "description";

  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "description");
  descriptionLabel.textContent = "description";

  const inputDescription = document.createElement("input");
  inputDescription.setAttribute("type", "text");
  inputDescription.setAttribute("name", "description");
  inputDescription.id = "description"; // check

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.className = "add-task-button";
  button.textContent = "submit";

  taskDiv.append(taskLabel, inputTask);
  dueDiv.append(dueLabel, inputDue);
  prioritySelect.append(
    priorityOptionOne,
    priorityOptionTwo,
    priorityOptionThree
  );
  priorityDiv.append(priorityLabel, prioritySelect);
  descriptionDiv.append(descriptionLabel, inputDescription);

  newTaskForm.append(taskDiv, dueDiv, priorityDiv, descriptionDiv, button);
  taskElement.appendChild(newTaskForm);

  button.addEventListener("click", () => {
    hideTaskForm();
    showTaskIcon();
  })
}

function addTaskIcon() {
  const addTask = document.createElement("div");
  addTask.className = "add-task-icon-container";
  addTask.textContent = "+ task";

  taskElement.appendChild(addTask);

  addTask.addEventListener("click", () => {
    showTaskForm();
    hideTaskIcon()
  });
}

function showProjectForm() {
  document.querySelector(".project-form").removeAttribute("hidden");
}

function hideProjectForm() {
  document.querySelector(".project-form").setAttribute("hidden", "true");
}

function hideProjectIcon() {
  document
    .querySelector(".add-project-icon-container")
    .setAttribute("hidden", "true");
}

function showProjectIcon() {
  document
    .querySelector(".add-project-icon-container")
    .removeAttribute("hidden");
}

function addProjectIcon() {
  const addProject = document.createElement("div");
  addProject.className = "add-project-icon-container";
  addProject.textContent = "+";

  projectElement.appendChild(addProject);

  addProject.addEventListener("click", () => {
    showProjectForm();
    hideProjectIcon();
  });
}

function projectForm() {
  const newProjectForm = document.createElement("form");
  newProjectForm.className = "project-form";
  newProjectForm.setAttribute("hidden", "true");

  const fieldsContainer = document.createElement("div")
  fieldsContainer.className = "new-project-input-and-button"

  const newProjectDiv = document.createElement("div");
  newProjectDiv.className = "project";

  const label = document.createElement("label");
  label.setAttribute("for", "project");
  label.textContent = "project";

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "project");
  input.setAttribute("id", "project");

  const submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.setAttribute("class", "add-project-button");
  submit.textContent = "add project";

  newProjectDiv.append(label, input);
  fieldsContainer.append(newProjectDiv, submit)
  newProjectForm.append(fieldsContainer);
  projectElement.appendChild(newProjectForm);

  submit.addEventListener("click", () => {
    hideProjectForm();
    showProjectIcon();
  });
}

function createProjectElements(project) {
  const projectDiv = document.createElement("div");
  projectDiv.className = "sidebar-project";
  projectContainer.appendChild(projectDiv);
  // edit button (for now)
  const projectName = document.createElement("p");
  projectName.className = "project-name";
  projectName.textContent = project.name;
  projectName.setAttribute("data-projectID", project.projectUuid);
  projectDiv.appendChild(projectName);

  const editButton = document.createElement("button");
  editButton.className = "project-edit-button";
  editButton.textContent = "edit";
  editButton.setAttribute("data-projectID", project.projectUuid);
  projectDiv.appendChild(editButton);
  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "project-delete-button";
  deleteButton.textContent = "delete";
  deleteButton.setAttribute("data-projectID", project.projectUuid);
  projectDiv.appendChild(deleteButton);
  // disable buttons
  editButton.disabled = true;
  deleteButton.disabled = false;
}

function createTaskElement(taskObject) {
  // task div
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.setAttribute("data-taskID", taskObject.taskUuid);
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
  removeChildNodes(projectContainer);
  const projects = vaultProjectsArray;
  projects.forEach((project) => {
    createProjectElements(project);
  });
}

export default function renderCurrent(allProjects, currentProjectTasks) {
  renderProjects(allProjects);
  renderTasks(currentProjectTasks);
}

addTaskIcon();
taskForm();

addProjectIcon();
projectForm();
