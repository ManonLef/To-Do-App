// eslint-disable-next-line import/no-extraneous-dependencies
import _ from "lodash";
import Task from "./task";
import Project from "./project";
import Vault from "./vault";
import { renderTasks, renderProjects } from "./view";
//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Startup state • |||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

const vault = new Vault("vault");
vault.newProject = new Project("Default Project");

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
//  |||||||||||||||||||||||||||||| • New Tasks • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function getTaskFromForm() {
  const task = document.querySelector("#task").value;
  const description = document.querySelector("#description").value;
  const due = document.querySelector("#due-date").value;
  const prio = document.querySelector("#priority").value;
  const project = document.querySelector("#project").value;

  return [task, description, due, prio, project];
}

function addTaskToProject(task) {
  const index = _.findIndex(vault.projects, { name: task.project });
  if (index >= 0) {
    vault.projects[index].tasks = task;
  } else {
    vault.newProject = new Project(task.project);
    vault.projects[vault.projects.length - 1].tasks = task;
  }
  addToStorage();
}

function workflowNewTask() {
  const newTask = new Task(getTaskFromForm());
  addTaskToProject(newTask);
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||| • Project Manipulation • ||||||||||||||||||||||||
//  --------------------------------------------------------------------------

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

function findProjectIndex(projectUuid) {
  const projectIndex = _.findIndex(vault.projects, {
    projectUuid,
  });
  return projectIndex;
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
//  |||||||||||||||||||||||||||||| • Listeners • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

document.querySelector(".submit-form").addEventListener("click", () => {
  workflowNewTask();
  console.table(vault.projects);
  console.table(vault.projects.tasks);
  console.log(vault.projects);
});

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------
function getTasksFromProject(projectIdentifier) {
  console.table(vault.projects[projectIdentifier].projectTasks);
  return vault.projects[projectIdentifier].projectTasks;
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

function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });
}

function addProjectListeners() {
  const projects = document.querySelectorAll(".sidebar-project");
  projects.forEach((element) => {
    const id = element.getAttribute("data-projectID");
    const projectIndex = findProjectIndex(id);
    element.addEventListener("click", () => {
      renderTasks(getTasksFromProject(projectIndex));
      addDeleteListeners();
    });
  });
}

function startUpState() {
  renderProjects(vault.projects);
  addProjectListeners();
  renderTasks(getTasksFromProject(0));
  addDeleteListeners();
}

startUpState();

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
