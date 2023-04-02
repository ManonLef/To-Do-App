/* eslint no-use-before-define: ["error", { "functions": false }] */
import renderCurrent from "./view";
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
  toggleStatus,
  sortedArray,
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

function selectProjectOnClick(event) {
  const id = this.getAttribute("data-projectID");

  if (event.detail === 1) {
    setCurrentProject(id);
    renderAll();
    console.log(`event detail = ${event.detail}`)
  } else {
    console.log(`event detail = ${event.detail}`)

    // refactor by giving the view more descriptive classnames or id's with uuid
    console.log(this.nextSibling);
    if (this.getAttribute("hidden") === "true") {
      this.removeAttribute("hidden");
      this.nextSibling.setAttribute("hidden", "true");
      console.log("hidden");
    } else {
      this.setAttribute("hidden", "true");
      this.nextSibling.removeAttribute("hidden");
      document.querySelector(`.edit-${id}`).focus();
      console.log("unhidden");
    }
  }
}

function toggleCheckBox() {
  const id = this.getAttribute("data-taskID");
  toggleStatus(id);
  renderAll();
}

export default function renderAll() {
  renderCurrent(getAllProjects(), sortedArray(), getCurrentProjectID());
  console.table(getTaskArrayCurrentProject());
  addProjectListeners();
  addTaskDeleteListeners();
  addProjectEditListeners();
  addCheckBoxListeners();
  console.table(vault.projects);
}

function changeProjectName() {
  const projectUuid = this.getAttribute("data-projectID");
  const newNameTarget = `.edit-${projectUuid}`;
  const newName = document.querySelector(newNameTarget).value;
  editProjectName(projectUuid, newName);
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

function addProjectEditListeners() {
  const deleteButtons = document.querySelectorAll(".project-delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("mouseup", deleteProjectOnClick);
  });
  // edit name of project through enter
  const editForm = document.querySelectorAll(".edit-project-name-submit");
  editForm.forEach((button) => {
    button.addEventListener("mouseup", changeProjectName);
  });

  const inputField = document.querySelectorAll("#edit-project-input");
  inputField.forEach((field) => {
    field.addEventListener("focusout", changeProjectName);
  });
}

function addCheckBoxListeners() {
  const checkBox = document.querySelectorAll(".checkbox");
  checkBox.forEach((box) => {
    box.addEventListener("change", toggleCheckBox);
  });
}

// new task and new form submit buttons (hidden by default)
document.querySelector(".add-task-button").addEventListener("click", () => {
  addTaskToProject(getTaskFromForm());
  document.querySelector(".task-form").reset();
  renderAll();
});

document
  .querySelector(".add-project-button")
  .addEventListener("click", () => {
    const projectName = document.querySelector("#project").value;
    document.querySelector(".project-form").reset();
    addProject(projectName);
    const projectID = findProjectIdFromName(projectName);
    setCurrentProject(projectID);
    renderAll();
  });
