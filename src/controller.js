/* eslint no-use-before-define: ["error", { "functions": false }] */
import { renderCurrent, renderProjects, renderTasks } from "./view";
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
  findProjectIndexFromId,
  removeProject,
  setCurrentProjectToDefault,
  editProjectName,
  // editProjectName,
} from "./model";

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Startup state • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

setCurrentProjectToDefault();

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||||| • Forms • |||||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function getTaskFromForm() {
  const task = document.querySelector("#task").value;
  const description = document.querySelector("#description").value;
  const due = document.querySelector("#due-date").value;
  const prio = document.querySelector("#priority").value;
  const projectUuid = getCurrentProjectID();

  return [task, description, due, prio, projectUuid];
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Functionality • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function deleteTaskOnClick() {
  const id = this.getAttribute("data-taskID");
  removeTask(id);
  renderAll();
}

function deleteProjectOnClick() {
  const id = this.getAttribute("data-projectID");
  const index = findProjectIndexFromId(id);
  console.log(
    `deleteProjectOnClick says: HI!!! I'm a project delete button for project ${id} at index ${index}<----------------`
  );
  removeProject(id);
  setCurrentProject(vault.projects[0].projectUuid);
  renderAll();
}

function selectProjectOnClick() {
  const id = this.getAttribute("data-projectID");
  setCurrentProject(id);
  renderTasks(getTaskArrayCurrentProject());
}

export default function renderAll() {
  renderCurrent(getAllProjects(), getTaskArrayCurrentProject());
  console.table(getTaskArrayCurrentProject());
  addProjectListeners();
  addTaskDeleteListeners();
  addProjectEditListeners();
  console.table(vault.projects);
}

function addProjectInputListener() {
  const projectUuid = this.getAttribute("data-projectID");
      const newNameTarget = `.edit-${projectUuid}`;
      const newName = document.querySelector(newNameTarget).value;
      editProjectName(projectUuid, newName);
      renderAll()
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • Listeners • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function addProjectListeners() {
  const projects = document.querySelectorAll(".project-name");
  projects.forEach((element) => {
    element.addEventListener("mousedown", selectProjectOnClick);
  });
}

function addTaskDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTaskOnClick);
  });
}

function addProjectEditListeners() {
  const deleteButtons = document.querySelectorAll(".project-delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteProjectOnClick);
  });
  // edit name of project through enter
  const editForm = document.querySelectorAll(".edit-project-name-submit");
  editForm.forEach((button) => {
    button.addEventListener("mousedown", addProjectInputListener);
  });

  const inputField = document.querySelectorAll("#edit-project-input");
  inputField.forEach((field) => {
    field.addEventListener("focusout", addProjectInputListener);
  });
}

// new task and new form submit buttons (hidden by default)
document
  .querySelector(".add-task-button")
  .addEventListener("click", () => {
    addTaskToProject(getTaskFromForm());
    document.querySelector(".task-form").reset()
    renderAll();
  });

document
  .querySelector(".add-project-button")
  .addEventListener("click", () => {
    const projectName = document.querySelector("#project").value;
    document.querySelector(".project-form").reset()
    addProject(projectName);
    const projectID = findProjectIdFromName(projectName);
    setCurrentProject(projectID);
    renderAll();
  });
