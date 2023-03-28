import _ from "lodash";
import Vault from "./vault";
import Project from "./project";
import Task from "./task";


//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Startup state • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

const vault = new Vault("vault");
vault.newProject = new Project("Default Project");
let currentProject = "";

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • edit variables • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • edit variables • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function setCurrentProject(projectID) {
  currentProject = projectID;
  console.log(`setCurrentProject says: current project is ${currentProject}`);
  return currentProject;
}

function getCurrentProjectID() {
  return currentProject;
}

function getCurrentProjectIndex() {
  const projectUuid = getCurrentProjectID()
  const projectIndex = _.findIndex(vault.projects, {
    projectUuid,
  });
  console.log(`getCurrentProjectIndex says: hey noob it's me again with index ${projectIndex}`)
  return projectIndex;
}

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

export { vault, addPrototype, retrieveLocalStorage, addToStorage, setCurrentProject, getCurrentProjectID, getCurrentProjectIndex };
