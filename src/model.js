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
//  |||||||||||||||||||||||||| • edit variables • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function setCurrentProject(projectID) {
  currentProject = projectID;
  console.log(`setCurrentProject says: current project is ${currentProject}`);
  return currentProject;
}

function addProject(name) {
  vault.newProject = new Project(name);
  addToStorage()
}

function addTaskToProject(taskFromForm) {
  const task = new Task(taskFromForm);
  const index = getCurrentProjectIndex();
  if (index >= 0) {
    vault.projects[index].tasks = task;
  }
  addToStorage();
}
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
  console.log(`getTaskArrayCurrentProject says: hey it's me`)
  const index = getCurrentProjectIndex();
  console.log(`getTaskArrayCurrentProject says: This project resides at index ${index}`);
  return vault.projects[index].projectTasks;
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • helpers • |||||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function findProjectIdFromName(name) {
  const index = _.findIndex(vault.projects, { name: name });
  const projectUuid = vault.projects[index].projectUuid;
  return projectUuid
}



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
};
