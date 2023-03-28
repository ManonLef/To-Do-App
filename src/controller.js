// eslint-disable-next-line import/no-extraneous-dependencies
import _ from "lodash";
import Task from "./classes/task";
import { renderTasks, renderProjects } from "./view";
import {
  vault,
  addToStorage,
  setCurrentProject,
  getCurrentProjectID,
  getCurrentProjectIndex,
  addProject,
  findProjectIdFromName,
} from "./model";

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Startup state • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------
setCurrentProject(vault.projects[0].projectUuid);
// test
getCurrentProjectIndex();

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||| • Project Manipulation • ||||||||||||||||||||||||
//  --------------------------------------------------------------------------



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

function addTaskToProject() {
  const task = new Task(getTaskFromForm());
  const index = getCurrentProjectIndex();
  // const index = _.findIndex(vault.projects, { name: task.project });
  if (index >= 0) {
    vault.projects[index].tasks = task;
    // } else {
    //   vault.newProject = new Project(task.project);
    //   vault.projects[vault.projects.length - 1].tasks = task;
  }
  addToStorage();
}

// function workflowNewTask() {
//   const newTask = new Task(getTaskFromForm());
//   addTaskToProject(newTask);
// }


// eslint-disable-next-line no-unused-vars
function changeProjectName(projectIdentifier, newProjectName) {
  const projectIndex = _.findIndex(vault.projects, { name: projectIdentifier }); // could be id as well
  vault.projects[projectIndex].name = newProjectName;
  addToStorage();
}

// eslint-disable-next-line no-unused-vars
function removeProject(projectIdentifier) {
  const projectIndex = _.findIndex(vault.projects, {
    projectUuid: projectIdentifier,
  }); // could be id as well
  console.log(`splicing out the project at index number ${projectIndex}`);
  vault.projects.splice(projectIndex, 1);
  addToStorage();
}



//  --------------------------------------------------------------------------
//  ||||||||||||||||||||||||| • Task Manipulation • ||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function findTaskByUuid(taskUuid) {
  for (let i = 0; i < vault.projects.length; i += 1) {
    const taskIndex = _.findIndex(vault.projects[i].projectTasks, { taskUuid });
    if (taskIndex > -1) {
      const projectIndex = i;
      return [projectIndex, taskIndex];
    }
  }
  return "not found";
}

function getTaskIndex(taskUuid) {
  const projectAndTaskIndex = findTaskByUuid(taskUuid);
  const taskIndex = projectAndTaskIndex[1];
  return taskIndex;
}

function getProjectIndex(taskUuid) {
  const projectAndTaskIndex = findTaskByUuid(taskUuid);
  const projectIndex = projectAndTaskIndex[0];
  return projectIndex;
}

function removeTask(taskUuid) {
  vault.projects[getProjectIndex(taskUuid)].projectTasks.splice(
    getTaskIndex(taskUuid),
    1
  );
  addToStorage();
}

// eslint-disable-next-line no-unused-vars
function changeTaskName(taskUuid, newName) {
  vault.projects[getProjectIndex(taskUuid)].projectTasks[
    getTaskIndex(taskUuid)
  ].task = newName;
  addToStorage();
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------
function getTasksFromProject(projectIdentifier) {
  console.table(vault.projects[projectIdentifier].projectTasks);
  return vault.projects[projectIdentifier].projectTasks;
}

function getTaskArrayCurrentProject() {
  console.log(`getTaskArrayCurrentProject says: hey it's me`)
  const index = getCurrentProjectIndex();
  console.log(`getTaskArrayCurrentProject says: This project resides at index ${index}`);
  return vault.projects[index].projectTasks;
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function deleteTask() {
  const id = this.getAttribute("data-taskID");
  const projectIndex = getProjectIndex(id);
  removeTask(id);
  renderTasks(getTasksFromProject(projectIndex));
  addDeleteListeners();
}


function addProjectListeners() {
  const projects = document.querySelectorAll(".sidebar-project");
  projects.forEach((element) => {
    const id = element.getAttribute("data-projectID");
    element.addEventListener("click", () => {
      setCurrentProject(id);
      renderAll();
    });
  });
}

function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • Listeners • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

document.querySelector(".submit-form").addEventListener("click", () => {
  addTaskToProject();
  console.table(vault.projects);
  console.table(vault.projects.tasks);
  console.log(vault.projects);
  renderAll();
});

document.querySelector(".add-project-form").addEventListener("click", () => {
  const projectName = document.querySelector("#project").value;
  addProject(projectName);
  const projectID = findProjectIdFromName(projectName)
  setCurrentProject(projectID)
  renderAll();
})
//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • View Update • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function renderAll() {
  renderProjects(vault.projects);
  addProjectListeners();
  renderTasks(getTaskArrayCurrentProject());
  addDeleteListeners();
}

renderAll();

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
