/* eslint no-use-before-define: ["error", { "functions": false }] */
import { renderCurrent, toggleEditProject } from "./view";
import {
  vault,
  setCurrentProject,
  getCurrentProjectID,
  addProject,
  findProjectIdFromName,
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
} from "./model";

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Startup state • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

setCurrentProjectToDefault();

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||||| • Forms • |||||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function getTaskFromForm() {
  const { checked } = document.querySelector("#checkbox");
  const task = document.querySelector("#task").value;
  const due = document.querySelector("#due-date").value;
  const prio = document.querySelector("#priority").value;
  const projectUuid = getCurrentProjectID();
  const description = document.querySelector("#description").value;

  return [checked, task, due, prio, projectUuid, description];
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Functionality • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function deleteTaskOnClick() {
  const id = this.getAttribute("data-taskID");
  removeTask(id);
  renderAll();
}

function selectProjectOnClick(event) {
  const id = this.getAttribute("data-projectID");
  setCurrentProject(id);
  renderAll();
  if (event.detail === 2) {
    toggleEditProject(id);
  }
}

export default function renderAll() {
  renderCurrent(getAllProjects(), sortedArray(), getCurrentProjectID());
  console.table(getTaskArrayCurrentProject());
  addProjectListeners();
  addTaskDeleteListeners();
  addProjectEditListeners();
  addCheckBoxListeners();
  addTaskNameEditListeners();
  console.table(vault.projects);
}

function changeProjectName(e) {
  console.log(e.type);
  // remove focusout listener to avoid double event invocation
  if (e.type === "click") {
    const inputField = document.querySelectorAll("#edit-project-input");
    inputField.forEach((field) => {
      field.removeEventListener("focusout", changeProjectName);
    });
  }
  // to avoid submitting of the form
  e.preventDefault();
  const projectUuid = this.getAttribute("data-projectID");
  const newNameTarget = `.edit-${projectUuid}`;
  const newName = document.querySelector(newNameTarget).value;
  editProjectName(projectUuid, newName);
  console.log("timeout");
  renderAll();
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • Listeners • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function addProjectListeners() {
  const projects = document.querySelectorAll(".project-name");
  projects.forEach((element) => {
    element.addEventListener("mouseup", selectProjectOnClick);
  });
}

function addTaskDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("mouseup", deleteTaskOnClick);
  });
}

// project edit or delete listeners
function addProjectEditListeners() {
  const deleteButtons = document.querySelectorAll(".project-delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("mouseup", deleteProjectOnClick);
  });
  // edit name of project through enter
  const editForm = document.querySelectorAll(".edit-project-name-submit");
  editForm.forEach((button) => {
    button.addEventListener("click", changeProjectName);
  });
  // edit name of project when out of focus
  const inputField = document.querySelectorAll("#edit-project-input");
  inputField.forEach((field) => {
    field.addEventListener("focusout", changeProjectName);
  });
}

function deleteProjectOnClick() {
  const id = this.getAttribute("data-projectID");
  removeProject(id);
  setCurrentProject(vault.projects[0].projectUuid);
  renderAll();
}

// task checkbox field listener
function addCheckBoxListeners() {
  const checkBox = document.querySelectorAll(".checkbox");
  checkBox.forEach((box) => {
    box.addEventListener("change", toggleCheckBox);
  });
}

function toggleCheckBox() {
  const id = this.getAttribute("data-taskID");
  toggleStatus(id);
  renderAll();
}

// task name field edit listeners
function addTaskNameEditListeners() {
  const taskNameFields = document.querySelectorAll(".task-name,.checked");
  taskNameFields.forEach((field) => {
    field.addEventListener("dblclick", makeFieldEditable);
  });
}

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

  const ID = this.getAttribute("data-taskID")
  const newName = this.textContent;

  // prepping this for re-use on project
  if (this.classList.contains("task-name")) {
    changeTaskName(ID, newName)
  }
  // no need to render now since this already shows the correct name
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
  const projectID = findProjectIdFromName(projectName);
  setCurrentProject(projectID);
  renderAll();
});
