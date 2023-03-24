// eslint-disable-next-line import/no-extraneous-dependencies
import _ from "lodash";
import Task from "./task";
import Project from "./project";

class Vault {
  constructor(name) {
    this.name = name;
    this.projects = [new Project("inbox")];
  }

  set newProject(project) {
    this.projects.push(new Project(project));
  }
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • Storage • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

const vault = new Vault("vault");

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
    vault.newProject = task.project;
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

function changeProjectName(projectIdentifier, newProjectName) {
  const projectIndex = _.findIndex(vault.projects, { name: projectIdentifier }); // could be id as well
  vault.projects[projectIndex].name = newProjectName;
  addToStorage();
}

//  --------------------------------------------------------------------------
//  ||||||||||||||||||||||||| • Task Manipulation • ||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function findTaskByUuid(taskUuid) {
  for (let i = 0; i < vault.projects.length; i += 1) {
    const taskIndex = _.findIndex(vault.projects[i].projectTasks, { taskUuid });
    if (taskIndex > -1) {
      console.log(
        `found it in project index ${i} named ${vault.projects[i].name}, this is task index ${taskIndex} `
      );
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
  vault.projects[getProjectIndex(taskUuid)].projectTasks.splice(getTaskIndex(taskUuid), 1);
  addToStorage();
}


//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • Listeners • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

document.querySelector("button").addEventListener("click", () => {
  workflowNewTask();
  console.table(vault.projects);
  console.log(vault.projects);
});

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
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

// function removeProject(index) {
//   console.log(`splicing out the project at index number ${index}`);
//   vault.projects.splice(index, 1);
//   addToStorage()
// }
