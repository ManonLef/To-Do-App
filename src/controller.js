/* eslint no-use-before-define: ["error", { "functions": false }] */
import { renderCurrent } from "./view";
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
} from "./model";

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Startup state • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

setCurrentProjectToDefault();

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • New Tasks • |||||||||||||||||||||||||||||
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
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
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
  renderAll();
}

export default function renderAll() {
  renderCurrent(getAllProjects(), getTaskArrayCurrentProject());
  console.table(getTaskArrayCurrentProject());
  addProjectListeners();
  addTaskDeleteListeners();
  addProjectDeleteListeners();
  console.table(vault.projects);
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • Listeners • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------
function addProjectListeners() {
  const projects = document.querySelectorAll(".project-name");
  projects.forEach((element) => {
    element.addEventListener("click", selectProjectOnClick);
  });
}

function addTaskDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTaskOnClick);
  });
}

function addProjectDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".project-delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteProjectOnClick);
  });
}

document.querySelector(".submit-form").addEventListener("click", () => {
  addTaskToProject(getTaskFromForm());
  // console.table(vault.projects);
  // console.table(vault.projects.tasks);
  // console.log(vault.projects);
  renderAll();
});

document
  .querySelector(".add-project-form")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const projectName = document.querySelector("#project").value;
    // document.querySelector("#project").value = "";
    addProject(projectName);
    const projectID = findProjectIdFromName(projectName);
    setCurrentProject(projectID);
    renderAll();
  });

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • View Update • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

// function returnAllTasks() {
//   const allProjects = vault.projects;
//   const allTasks = [];
//   for (let i = 0; i < allProjects.length; i += 1) {
//     for (let j = 0; j < allProjects[i].projectTasks.length; j += 1) {
//       allTasks.push(allProjects[i].projectTasks[j]);
//     }
//   }
//   console.table(allTasks);
//   return allTasks;
// }
