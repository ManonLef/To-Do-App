import _ from "lodash";
import Vault from "./classes/vault";
import Project from "./classes/project";
import Task from "./classes/task";

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Startup state • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

const vault = new Vault("vault");
vault.newProject = new Project("Default Project");
let currentProject = "";

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • Storage • |||||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function addPrototype(parsedArray) {
  for (let i = 0; i < parsedArray.length; i += 1) {
    Object.setPrototypeOf(parsedArray[i], Project.prototype);
    for (let j = 0; j < parsedArray[i].projectTasks.length; j += 1) {
      Object.setPrototypeOf(parsedArray[i].projectTasks[j], Task.prototype);
    }
  }
}

function retrieveLocalStorage() {
  if (localStorage.getItem("array")) {
    const str = localStorage.getItem("array");
    const parsedArray = JSON.parse(str);
    addPrototype(parsedArray);
    vault.projects = parsedArray;
    console.log(vault.projects);
    return vault.projects;
  }
  return console.log("no local storage available");
}

function addToStorage() {
  localStorage.removeItem("array");
  const myStorage = vault.projects;
  const jsonArray = JSON.stringify(myStorage);
  localStorage.setItem("array", jsonArray);
}
retrieveLocalStorage();

//  --------------------------------------------------------------------------
//  ||||||||||||||||||||||||||||| • get data • |||||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function getCurrentProjectID() {
  return currentProject;
}

function getAllProjects() {
  return vault.projects;
}

function getCurrentProjectIndex() {
  const projectUuid = getCurrentProjectID();
  const projectIndex = _.findIndex(vault.projects, {
    projectUuid,
  });
  console.log(
    `getCurrentProjectIndex says: hey noob it's me again with index ${projectIndex}`
  );
  return projectIndex;
}

function getTaskArrayCurrentProject() {
  console.log(`getTaskArrayCurrentProject says: hey it's me`);
  const index = getCurrentProjectIndex();
  console.log(
    `getTaskArrayCurrentProject says: This project resides at index ${index}`
  );
  return vault.projects[index].projectTasks;
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • helpers • |||||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function findTaskIndex(taskUuid) {
  const taskIndex = _.findIndex(
    vault.projects[getCurrentProjectIndex()].projectTasks,
    { taskUuid }
  );
  return taskIndex;
}

function findProjectIdFromName(name) {
  const index = _.findIndex(vault.projects, { name });
  const { projectUuid } = vault.projects[index];
  return projectUuid;
}

function findProjectIndexFromId(id) {
  const projectUuid = id;
  const projectIndex = _.findIndex(vault.projects, { projectUuid });
  return projectIndex;
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • edit variables • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function setCurrentProject(projectID) {
  currentProject = projectID;
  console.log(`setCurrentProject says: current project is ${currentProject}`);
  return currentProject;
}

function setCurrentProjectToDefault() {
  setCurrentProject(vault.projects[0].projectUuid);
}

function addProject(name) {
  vault.newProject = new Project(name);
  addToStorage();
}

function addTaskToProject(taskFromForm) {
  const task = new Task(taskFromForm);
  const index = getCurrentProjectIndex();
  if (index >= 0) {
    vault.projects[index].tasks = task;
  }
  addToStorage();
}

function removeTask(taskUuid) {
  vault.projects[getCurrentProjectIndex()].projectTasks.splice(
    findTaskIndex(taskUuid),
    1
  );
  addToStorage();
}

function removeProject(projectUuid) {
  vault.projects.splice(findProjectIndexFromId(projectUuid), 1);
  addToStorage();
}

function editProjectName(projectUuid, newName) {
  const index = findProjectIndexFromId(projectUuid)
  vault.projects[index].name = newName
  addToStorage()
}

// unused from controller

// function getProjectIndex(taskUuid) {
//   const projectAndTaskIndex = findTaskByUuid(taskUuid);
//   const projectIndex = projectAndTaskIndex[0];
//   return projectIndex;
// }

// // eslint-disable-next-line no-unused-vars
// function changeTaskName(taskUuid, newName) {
//   vault.projects[getProjectIndex(taskUuid)].projectTasks[
//     getTaskIndex(taskUuid)
//   ].task = newName;
//   addToStorage();
// }
//
// function findTaskByUuid(taskUuid) {
//   for (let i = 0; i < vault.projects.length; i += 1) {
//     const taskIndex = _.findIndex(vault.projects[i].projectTasks, { taskUuid });
//     if (taskIndex > -1) {
//       const projectIndex = i;
//       return [projectIndex, taskIndex];
//     }
//   }
//   return "not found";
// }
//
// // eslint-disable-next-line no-unused-vars
// function changeProjectName(projectIdentifier, newProjectName) {
//   const projectIndex = _.findIndex(vault.projects, { name: projectIdentifier }); // could be id as well
//   vault.projects[projectIndex].name = newProjectName;
//   addToStorage();
// }

// // eslint-disable-next-line no-unused-vars
// function removeProject(projectIdentifier) {
//   const projectIndex = _.findIndex(vault.projects, {
//     projectUuid: projectIdentifier,
//   }); // could be id as well
//   console.log(`splicing out the project at index number ${projectIndex}`);
//   vault.projects.splice(projectIndex, 1);
//   addToStorage();
// }

export {
  vault,
  addPrototype,
  retrieveLocalStorage,
  addToStorage,
  setCurrentProject,
  getCurrentProjectID,
  getCurrentProjectIndex,
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
};
