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
  editTaskDue
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
  // const description = document.querySelector("#description").value;

  return [checked, task, due, prio, projectUuid];
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
  // in case of doubleclick we want to continue to the edit field but remove the listener for single click
  if (event.detail === 2) {
    this.removeEventListener("mouseup", selectProjectOnClick)
  }
  // if this is just single click, rerender
  if (event.detail === 1) {
    renderAll();
  }
}

export default function renderAll() {
  renderCurrent(getAllProjects(), sortedArray(), getCurrentProjectID());
  console.table(getTaskArrayCurrentProject());
  addProjectListeners();
  addTaskDeleteListeners();
  // addProjectEditListeners();
  addCheckBoxListeners();
  addTaskNameEditListeners();
  addDateChangeListeners();
  //
  addPriorityListeners()
  console.table(vault.projects);
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • Listeners • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

// project edit or delete listeners
function addProjectListeners() {
  const deleteButtons = document.querySelectorAll(".project-delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("mouseup", deleteProjectOnClick);
  });
  const projects = document.querySelectorAll(".project-name");
  projects.forEach((element) => {
    element.addEventListener("mouseup", selectProjectOnClick);
  });
  const projectNameFields = document.querySelectorAll(".project-name");
  projectNameFields.forEach((field) => {
    field.addEventListener("dblclick", makeFieldEditable);
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

// listen for prio change
function addPriorityListeners() {
  const priority = document.querySelectorAll("#task-priority")
  priority.forEach((dropdown) => {
    dropdown.addEventListener("change", editPrio);
  })
}

function editPrio() {
  const id = this.getAttribute("data-taskID");
  const {value} = this
  console.log(`prio updated for ${id}`)
  editPriority(id,value);
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

function addTaskDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("mouseup", deleteTaskOnClick);
  });
}

function addDateChangeListeners() {
  const dateFields = document.querySelectorAll("#date");
  dateFields.forEach((date) => {
    date.addEventListener("change", editTaskDate)
  })
}

function editTaskDate() {
  const id = this.getAttribute("data-taskID")
  const newDate = this.value
  console.log(`${id} ${newDate}`)
  editTaskDue(id, newDate)
  renderAll()
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
