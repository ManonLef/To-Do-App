import _ from "lodash";
import Vault from "./classes/vault";
import Project from "./classes/project";
import Task from "./classes/task";

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Startup state • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

const vault = new Vault("vault");
vault.newProject = new Project("Inbox");
let currentProject = "";
vault.projects[0].default = "default";

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
  return projectIndex;
}

function getLatestProjectID() {
  const latestIdIndex = vault.projects.length - 1;
  const latestProjectID = vault.projects[latestIdIndex].projectUuid
  return latestProjectID
}

function getTaskArrayCurrentProject() {
  const index = getCurrentProjectIndex();
  return vault.projects[index].projectTasks;
}

function sortedArray() {
  // sorted by (unchecked + dueDate ascending > no dueDate) > (checked + dueDate ascending > no dueDate)
  const unchecked = _.filter(getTaskArrayCurrentProject(), task => !task.checked)
  const uncheckedWithDue = _.filter(unchecked, task => task.dueDate)
  const uncheckedWithDueDesc = _.sortBy(uncheckedWithDue, task => task.dueDate)
  const uncheckedWithoutDue = _.filter(unchecked, task => !task.dueDate)
  const sortedUnchecked = uncheckedWithDueDesc.concat(uncheckedWithoutDue)

  const checked = _.filter(getTaskArrayCurrentProject(), task => task.checked)
  const checkedWithDue = _.filter(checked, task => task.dueDate)
  const checkedWithDueDesc = _.sortBy(checkedWithDue, task => task.dueDate)
  const checkedWithoutDue = _.filter(checked, task => !task.dueDate)
  const sortedChecked = checkedWithDueDesc.concat(checkedWithoutDue)

  const sorted = sortedUnchecked.concat(sortedChecked)
  return sorted;
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

function findProjectIndexFromId(id) {
  const projectUuid = id;
  const projectIndex = _.findIndex(vault.projects, { projectUuid });
  return projectIndex;
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • edit variables • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

// projects

function setCurrentProject(projectID) {
  currentProject = projectID;
  return currentProject;
}

function setCurrentProjectToDefault() {
  setCurrentProject(vault.projects[0].projectUuid);
}

function addProject(name) {
  vault.newProject = new Project(name);
  addToStorage();
}

function removeProject(projectUuid) {
  vault.projects.splice(findProjectIndexFromId(projectUuid), 1);
  addToStorage();
}

function editProjectName(projectUuid, newName) {
  const index = findProjectIndexFromId(projectUuid);
  vault.projects[index].name = newName;
  addToStorage();
}

// tasks

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

function changeTaskName(taskUuid, newName) {
  const index = findTaskIndex(taskUuid)
  const task = vault.projects[getCurrentProjectIndex()].projectTasks[index];
  task.task = newName
  addToStorage()
}

function toggleStatus(taskUuid) {
  const taskIndex = findTaskIndex(taskUuid);
  const projectIndex = getCurrentProjectIndex();
  const taskToToggle = vault.projects[projectIndex].projectTasks[taskIndex];
  if (taskToToggle.checked) {
    taskToToggle.checked = false;
  } else {
    taskToToggle.checked = true;
  }
  addToStorage();
}

function editPriority(taskUuid, value) {
  const taskIndex = findTaskIndex(taskUuid);
  const projectIndex = getCurrentProjectIndex();
  vault.projects[projectIndex].projectTasks[taskIndex].priority = value
  addToStorage()
}

// unused from controller

// function findProjectIdFromName(name) {
//   const index = _.findIndex(vault.projects, { name });
//   const { projectUuid } = vault.projects[index];
//   return projectUuid;
// }


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
  changeTaskName,
  getLatestProjectID,
  editPriority,
};
