/* eslint no-use-before-define: ["error", { "functions": false }] */
import renderCurrent from "./view";
import {
  vault,
  setCurrentProject,
  getCurrentProjectID,
  addProject,
  getAllProjects,
  getTaskArrayCurrentProject,
  addTaskToProject,
  removeTask,
  removeProject,
  setCurrentProjectToDefault,
  editProjectName,
  toggleStatus,
  sortedArray,
  changeTaskName,
  getLatestProjectID,
  editPriority,
  editTaskDue,
} from "./model";

setCurrentProjectToDefault();

// project functions

function selectProjectOnClick(event) {
  const id = this.getAttribute("data-projectID");
  setCurrentProject(id);
  // in case of double click we want to continue to the edit field but remove the listener for single click
  if (event.detail === 2) {
    this.removeEventListener("mouseup", selectProjectOnClick);
  }
  // if this is just single click, rerender with new active project
  if (event.detail === 1) {
    renderAll();
  }
}

function deleteProjectOnClick() {
  const id = this.getAttribute("data-projectID");
  removeProject(id);
  setCurrentProject(vault.projects[0].projectUuid);
  renderAll();
}

// task functions

function getTaskFromForm() {
  const { checked } = document.querySelector("#checkbox");
  const task = document.querySelector("#task").value;
  const due = document.querySelector("#due-date").value;
  const prio = document.querySelector("#priority").value;
  const projectUuid = getCurrentProjectID();

  return [checked, task, due, prio, projectUuid];
}

function toggleTaskCheckBox() {
  const id = this.getAttribute("data-taskID");
  toggleStatus(id);
  renderAll();
}

function editTaskPriority() {
  const id = this.getAttribute("data-taskID");
  const { value } = this;
  editPriority(id, value);
  renderAll();
}

function editTaskDate() {
  const id = this.getAttribute("data-taskID");
  const newDate = this.value;
  editTaskDue(id, newDate);
  renderAll();
}

function deleteTaskOnClick() {
  const id = this.getAttribute("data-taskID");
  removeTask(id);
  renderAll();
}

// project and task combined functions

function makeFieldEditable() {
  this.setAttribute("contenteditable", "true");
  this.focus();
  this.addEventListener("keydown", editName);
  this.addEventListener("focusout", editName);
}

function editName(e) {
  if (e.key === "Enter" || e.type === "focusout" || e.key === "Escape") {
    this.removeAttribute("contenteditable", "true");
    this.removeEventListener("focusout", editName);
    this.removeEventListener("keydown", editName);
  }

  const id =
    this.getAttribute("data-taskID") || this.getAttribute("data-projectID");
  const newName = this.textContent;

  if (this.classList.contains("task-name")) {
    changeTaskName(id, newName);
  }

  if (this.classList.contains("project-name")) {
    editProjectName(id, newName);
  }
}

// project listeners

function addProjectDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".project-delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("mouseup", deleteProjectOnClick);
  });
}

function addProjectSelectListeners() {
  const projects = document.querySelectorAll(".sidebar-project");
  projects.forEach((element) => {
    element.addEventListener("mouseup", selectProjectOnClick);
  });
}

function addProjectEditListeners() {
  const projectNameFields = document.querySelectorAll(".project-name");
  projectNameFields.forEach((field) => {
    field.addEventListener("dblclick", makeFieldEditable);
  });
}

function addProjectListeners() {
  addProjectDeleteListeners();
  addProjectSelectListeners();
  addProjectEditListeners();
}

// task listeners

function addTaskCheckBoxListeners() {
  const checkBox = document.querySelectorAll(".checkbox");
  checkBox.forEach((checkbox) => {
    checkbox.addEventListener("change", toggleTaskCheckBox);
  });
}

function addTaskNameEditListeners() {
  const taskNameFields = document.querySelectorAll(".task-name");
  taskNameFields.forEach((field) => {
    field.addEventListener("dblclick", makeFieldEditable);
  });
}

function addTaskPriorityListeners() {
  const priority = document.querySelectorAll("#task-priority");
  priority.forEach((dropdown) => {
    dropdown.addEventListener("change", editTaskPriority);
  });
}

function addTaskDateListeners() {
  const dateFields = document.querySelectorAll("#date");
  dateFields.forEach((date) => {
    date.addEventListener("change", editTaskDate);
  });
}

function addTaskDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((trashcan) => {
    trashcan.addEventListener("mouseup", deleteTaskOnClick);
  });
}

function addTaskListeners() {
  addTaskCheckBoxListeners();
  addTaskNameEditListeners();
  addTaskPriorityListeners();
  addTaskDateListeners();
  addTaskDeleteListeners();
}

// new task and new form submit buttons (hidden by default)
document.querySelector(".add-task-button").addEventListener("click", () => {
  addTaskToProject(getTaskFromForm());
  document.querySelector(".task-form").reset();
  renderAll();
});

document.querySelector(".add-project-button").addEventListener("click", () => {
  const projectName = document.querySelector("#project").value;
  document.querySelector(".project-form").reset();
  addProject(projectName);
  setCurrentProject(getLatestProjectID());
  renderAll();
});

export default function renderAll() {
  renderCurrent(getAllProjects(), sortedArray(), getCurrentProjectID());
  addProjectListeners();
  addTaskListeners();
  addTaskPriorityListeners();
}
