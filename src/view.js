/* eslint no-use-before-define: ["error", { "functions": false }] */
import trash from "./trash.svg"
// static page content

const body = document.querySelector("body");

const pageContent = document.createElement("div");
pageContent.className = "content";
body.appendChild(pageContent);

const header = document.createElement("header");
header.textContent = "Procrasti-Not";
pageContent.appendChild(header);

const projectElement = document.createElement("div");
projectElement.className = "projects-sidebar";
pageContent.appendChild(projectElement);

const projectsLegend = document.createElement("div");
projectsLegend.className = "project-legend";
projectsLegend.textContent = "projects";
projectElement.appendChild(projectsLegend);

const projectContainer = document.createElement("div");
projectContainer.className = "project-container";
projectElement.appendChild(projectContainer);

const taskElement = document.createElement("div");
taskElement.className = "task-content";
pageContent.appendChild(taskElement);

const taskLegend = document.createElement("div");
taskLegend.className = "task-legend";
const legendTask = document.createElement("div");
legendTask.className = "legend-task-name";
legendTask.textContent = "task";
const legendPriority = document.createElement("div");
legendPriority.className = "legend-priority";
legendPriority.textContent = "priority";
const legendDue = document.createElement("div");
legendDue.className = "legend-due";
legendDue.textContent = "due";
taskLegend.append(legendTask, legendPriority, legendDue);
taskElement.appendChild(taskLegend);

const taskContainer = document.createElement("div");
taskContainer.className = "task-container";
taskElement.appendChild(taskContainer);

const footer = document.createElement("footer");
footer.textContent = "© 2023 Manon Lef";
pageContent.appendChild(footer);

addTaskIcon();
taskForm();

addProjectIcon();
projectForm();

// project form

function projectForm() {
  const newProjectForm = document.createElement("form");
  newProjectForm.className = "project-form";
  newProjectForm.setAttribute("hidden", "true");
  newProjectForm.setAttribute("onsubmit", "return false");

  const fieldsContainer = document.createElement("div");
  fieldsContainer.className = "new-project-input-and-button";

  const newProjectDiv = document.createElement("div");
  newProjectDiv.className = "project";

  const label = document.createElement("label");
  label.setAttribute("for", "project");

  const input = document.createElement("input");
  input.className = "new-project-input";
  input.setAttribute("type", "text");
  input.setAttribute("name", "project");
  input.setAttribute("id", "project");
  input.setAttribute("placeholder", "project name");

  const submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.setAttribute("class", "add-project-button");
  submit.textContent = "submit";

  newProjectDiv.append(label, input);
  fieldsContainer.append(newProjectDiv, submit);
  newProjectForm.append(fieldsContainer);
  projectElement.appendChild(newProjectForm);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      resetForm();
    }
  });

  submit.addEventListener("click", () => {
    hideProjectForm();
    showProjectIcon();
  })
}

function resetForm() {
  document.querySelector(".project-form").reset();
  hideProjectForm();
  showProjectIcon();
}

function focusListenProject(event) {
  if (
    event.target !== document.querySelector(".project-form") &&
    event.target !== document.querySelector(".new-project-input-and-button") &&
    event.target !== document.querySelector(".project") &&
    event.target !== document.querySelector(".new-project-input") &&
    event.target !== document.querySelector(".add-project-button")
  ) {
    resetForm();
  }
}
function showProjectForm() {
  document.addEventListener("mousedown", focusListenProject);
  document.querySelector(".project-form").removeAttribute("hidden");
  document.querySelector(".new-project-input").focus();
}

function hideProjectForm() {
  document.removeEventListener("mousedown", focusListenProject);
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
  addProject.textContent = "+ new project";
  projectElement.appendChild(addProject);

  addProject.addEventListener("click", () => {
    showProjectForm();
    hideProjectIcon();
  });
}

// task form

function taskForm() {
  const newTaskForm = document.createElement("form");
  newTaskForm.className = "task-form";
  newTaskForm.setAttribute("hidden", "true");
  newTaskForm.setAttribute("onsubmit", "return false");

  const formContainer = document.createElement("div");
  formContainer.className = "new-task-form-container";

  const taskAndCheckBoxDiv = document.createElement("div");
  taskAndCheckBoxDiv.className = "task-form-check-task-container";

  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const checkbox = document.createElement("input");
  checkbox.id = "checkbox";
  checkbox.setAttribute("type", "checkbox");

  taskAndCheckBoxDiv.append(checkbox, taskDiv);

  const taskLabel = document.createElement("label");
  taskLabel.setAttribute("for", "task");
  taskLabel.textContent = "task";
  taskLabel.setAttribute("hidden", "true");

  const inputTask = document.createElement("input");
  inputTask.setAttribute("type", "text");
  inputTask.setAttribute("name", "task");
  inputTask.setAttribute("placeholder", "new task");

  inputTask.id = "task";

  const dueDiv = document.createElement("div");
  dueDiv.className = "due-date";

  // const dueLabel = document.createElement("label");
  // dueLabel.setAttribute("for", "due-date");
  // dueLabel.setAttribute("hidden", "true");
  // dueLabel.textContent = "due";

  // const inputDue = document.createElement("input");
  // inputDue.setAttribute("type", "date");
  // inputDue.setAttribute("name", "due-date");
  // inputDue.id = "due-date";

  const upperSpan = document.createElement("span");
  upperSpan.className = "datepicker-toggle";

  const innerSpan = document.createElement("span");
  innerSpan.className = "datepicker-toggle-button";

  upperSpan.appendChild(innerSpan);

  const date = document.createElement("input");
  date.setAttribute("type", "date");
  // date.setAttribute("value", taskObject.dueDate);
  // date.setAttribute("data-taskID", taskObject.taskUuid);
  date.setAttribute("name", "due-date");

  date.id = "due-date";
  date.className = "datepicker-input";
  upperSpan.appendChild(date);
  date.valueAsDate = new Date();

  const dueDate = document.createElement("div");
  dueDate.className = "render-date";
  dueDate.textContent = date.value;

  date.addEventListener("change", () => {
    dueDate.textContent = date.value;
  });

  dueDiv.append(dueDate, upperSpan);

  const priorityDiv = document.createElement("div");
  priorityDiv.className = "priority";

  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.textContent = "priority";
  priorityLabel.setAttribute("hidden", "true");

  const prioritySelect = document.createElement("select");
  prioritySelect.setAttribute("name", "priority");
  prioritySelect.id = "priority";

  const priorityOptionNone = document.createElement("option");
  priorityOptionNone.setAttribute("value", "");
  priorityOptionNone.textContent = "";

  const priorityOptionOne = document.createElement("option");
  priorityOptionOne.setAttribute("value", "low");
  priorityOptionOne.setAttribute("selected", "true");
  priorityOptionOne.textContent = "low";

  const priorityOptionTwo = document.createElement("option");
  priorityOptionTwo.setAttribute("value", "medium");
  priorityOptionTwo.textContent = "medium";

  const priorityOptionThree = document.createElement("option");
  priorityOptionThree.setAttribute("value", "high");
  priorityOptionThree.textContent = "high";

  const submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.className = "add-task-button";
  submit.textContent = "submit";

  taskDiv.append(taskLabel, inputTask);
  // dueDiv.append(dueLabel, inputDue);
  prioritySelect.append(
    priorityOptionNone,
    priorityOptionOne,
    priorityOptionTwo,
    priorityOptionThree
  );
  priorityDiv.append(priorityLabel, prioritySelect);

  formContainer.append(taskAndCheckBoxDiv, priorityDiv, dueDiv, submit);
  newTaskForm.appendChild(formContainer);
  taskElement.appendChild(newTaskForm);

  submit.addEventListener("click", () => {
    hideTaskForm();
    showTaskIcon();
  });

  newTaskForm.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      resetTaskForm();
    }
  });
}

function resetTaskForm() {
  document.querySelector(".task-form").reset();
  hideTaskForm();
  showTaskIcon();
}

function showTaskForm() {
  document.querySelector(".task-form").removeAttribute("hidden");
  document.querySelector("#task").focus();
  document.addEventListener("mousedown", focusListen);
  // reset date to today
  const due = document.querySelector("#due-date");
  due.valueAsDate = new Date();
  document.querySelector(".render-date").textContent = due.value;
}

// to add cross browser compatibility due to different form handling and form-events losing focus
function focusListen(event) {
  if (
    event.target !== document.querySelector(".new-task-form-container") &&
    event.target !== document.querySelector(".task-form") &&
    event.target !==
      document.querySelector(".task-form-check-task-container") &&
    event.target !== document.querySelector("#checkbox") &&
    event.target !== document.querySelector(".task") &&
    event.target !== document.querySelector("#task") &&
    event.target !== document.querySelector("#priority") &&
    event.target !== document.querySelector(".priority") &&
    event.target !== document.querySelector(".due-date") &&
    event.target !== document.querySelector(".render-date") &&
    event.target !== document.querySelector(".datepicker-toggle") &&
    event.target !== document.querySelector(".datepicker-toggle-button") &&
    event.target !== document.querySelector("#due-date") &&
    event.target !== document.querySelector(".add-task-button")
  ) {
    resetTaskForm();
  }
}

function hideTaskForm() {
  document.querySelector(".task-form").setAttribute("hidden", "true");
  document.removeEventListener("click", focusListen);
}

function showTaskIcon() {
  document.querySelector(".add-task-icon-container").removeAttribute("hidden");
}

function hideTaskIcon() {
  document
    .querySelector(".add-task-icon-container")
    .setAttribute("hidden", "true");
}

function addTaskIcon() {
  const addTask = document.createElement("div");
  addTask.className = "add-task-icon-container";
  addTask.textContent = "+ new task";

  taskElement.appendChild(addTask);

  addTask.addEventListener("click", () => {
    showTaskForm();
    hideTaskIcon();
  });
}

// project and task elements

function createProjectElements(project, currentProjectId) {
  const projectDiv = document.createElement("div");
  projectDiv.className = "sidebar-project";
  projectDiv.setAttribute("data-projectID", project.projectUuid);

  projectContainer.appendChild(projectDiv);

  const sidebarContainer = document.createElement("div");
  sidebarContainer.className = "sidebar-container";
  sidebarContainer.setAttribute("data-projectID", project.projectUuid);
  projectDiv.appendChild(sidebarContainer);

  const projectName = document.createElement("p");
  projectName.className = "project-name";
  projectName.textContent = project.name;
  projectName.setAttribute("data-projectID", project.projectUuid);
  sidebarContainer.appendChild(projectName);

  // delete button (but not for default inbox)
  if (!project.default) {
    const deleteButton = new Image()
    deleteButton.src = trash
    // deleteButton.setAttribute(
    //   "src",
    //   "../src/trash.svg"
    // );
    projectDiv.appendChild(deleteButton);
    deleteButton.className = "project-delete-button";
    deleteButton.setAttribute("data-projectID", project.projectUuid);
  }
  // special class for currentProject
  if (currentProjectId === project.projectUuid) {
    projectDiv.classList.add("active-project");
  }
}

function createTaskElement(taskObject) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.setAttribute("data-taskID", taskObject.taskUuid);
  taskContainer.appendChild(taskDiv);

  const checkboxTaskDiv = document.createElement("div");
  checkboxTaskDiv.className = "check-and-task-container";
  taskDiv.appendChild(checkboxTaskDiv);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("data-taskID", taskObject.taskUuid);
  checkbox.className = "checkbox";
  checkboxTaskDiv.appendChild(checkbox);

  const task = document.createElement("p");
  task.textContent = taskObject.task;
  task.className = "task-name";
  task.setAttribute("data-taskID", taskObject.taskUuid);

  checkboxTaskDiv.appendChild(task);

  const prioritySelect = document.createElement("select");
  prioritySelect.setAttribute("data-taskID", taskObject.taskUuid);
  prioritySelect.setAttribute("name", "priority");
  prioritySelect.id = "task-priority";
  prioritySelect.value = taskObject.priority;

  const priorityOptionNone = document.createElement("option");
  priorityOptionNone.setAttribute("value", "none");
  priorityOptionNone.textContent = "none";

  const priorityOptionOne = document.createElement("option");
  priorityOptionOne.setAttribute("value", "low");
  priorityOptionOne.textContent = "low";

  const priorityOptionTwo = document.createElement("option");
  priorityOptionTwo.setAttribute("value", "medium");
  priorityOptionTwo.textContent = "medium";

  const priorityOptionThree = document.createElement("option");
  priorityOptionThree.setAttribute("value", "high");
  priorityOptionThree.textContent = "high";

  prioritySelect.append(
    priorityOptionNone,
    priorityOptionOne,
    priorityOptionTwo,
    priorityOptionThree
  );
  taskDiv.appendChild(prioritySelect);

  // due (non input version)
  const dueDate = document.createElement("div");
  dueDate.className = "task-date";
  dueDate.textContent = taskObject.dueDate;
  taskDiv.appendChild(dueDate);

  // dueDate using spans to edit just using calendar
  const upperSpan = document.createElement("span");
  upperSpan.className = "datepicker-toggle";

  const innerSpan = document.createElement("span");
  innerSpan.className = "datepicker-toggle-button";

  upperSpan.appendChild(innerSpan);

  const date = document.createElement("input");
  date.setAttribute("type", "date");
  date.setAttribute("value", taskObject.dueDate);
  date.setAttribute("data-taskID", taskObject.taskUuid);
  date.id = "date";
  date.className = "datepicker-input";
  upperSpan.appendChild(date);

  taskDiv.append(upperSpan);

  const deleteButton = new Image()
  deleteButton.src = trash;
  taskDiv.appendChild(deleteButton);
  deleteButton.className = "delete-button";
  deleteButton.textContent = "delete";
  deleteButton.setAttribute("data-taskID", taskObject.taskUuid);
  
  // special classes for priority
  if (taskObject.priority === "low") {
    checkbox.classList.add("low-prio");
    priorityOptionOne.selected = "selected";
  } else if (taskObject.priority === "medium") {
    checkbox.classList.add("medium-prio");
    priorityOptionTwo.selected = "selected";
  } else if (taskObject.priority === "high") {
    checkbox.classList.add("high-prio");
    priorityOptionThree.selected = "selected";
  } else {
    priorityOptionNone.selected = "selected";
    priorityOptionNone.textContent = "";
  }

  if (taskObject.checked) {
    checkbox.setAttribute("checked", true);
    task.classList.add("checked");
    dueDate.classList.add("checked");
    prioritySelect.classList.add("checked");
    taskDiv.classList.add("checked");
  }
}

// rendering

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderTasks(projectTasks) {
  removeChildNodes(taskContainer);
  projectTasks.forEach((taskObject) => {
    createTaskElement(taskObject);
  });
}

function renderProjects(vaultProjectsArray, currentProjectId) {
  removeChildNodes(projectContainer);
  const projects = vaultProjectsArray;
  projects.forEach((project) => {
    createProjectElements(project, currentProjectId);
  });
}

export default function renderCurrent(
  allProjects,
  currentProjectTasks,
  currentProjectId
) {
  renderProjects(allProjects, currentProjectId);
  renderTasks(currentProjectTasks);
}
