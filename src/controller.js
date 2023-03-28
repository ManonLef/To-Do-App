// eslint-disable-next-line import/no-extraneous-dependencies
import _ from "lodash";
import Task from "./classes/task";
import { renderCurrent } from "./view";
import {
  vault,
  addToStorage,
  setCurrentProject,
  getCurrentProjectID,
  getCurrentProjectIndex,
  addProject,
  findProjectIdFromName,
  getAllProjects,
  getTaskArrayCurrentProject,
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

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function deleteTaskOnClick() {
  const id = this.getAttribute("data-taskID");
  removeTask(id);
  renderAll()
}

function selectProjectOnClick() {
  const id = this.getAttribute("data-projectID");
  setCurrentProject(id)
  renderAll();
}


function addProjectListeners() {
  const projects = document.querySelectorAll(".sidebar-project");
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

function renderAll() {
  renderCurrent(getAllProjects(), getTaskArrayCurrentProject())
  console.table(getTaskArrayCurrentProject());
  addProjectListeners();
  addTaskDeleteListeners();
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
