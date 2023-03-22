// eslint-disable-next-line import/no-extraneous-dependencies
import _ from "lodash";
import Task from "./task";
import Project from "./project";

class Vault {
  constructor(name) {
    this.name = name;
    this.projects = [new Project("inbox")];
  }

  get allProjects() {
    return this.projects;
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
    console.log(vault.projects)
    return vault.projects;
  }
  return "no local storage available";
}

function addToStorage() {
  localStorage.removeItem("array");
  const myStorage = vault.projects;
  const jsonArray = JSON.stringify(myStorage);
  localStorage.setItem("array", jsonArray);
}
retrieveLocalStorage();

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
//  |||||||||||||||||||||||||||||| • Listeners • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

document.querySelector("button").addEventListener("click", () => {
  workflowNewTask();
  console.table(vault.projects);
  console.log(vault.allProjects);
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

// function addTaskToNewProject(task, project) {
//   vault.newProject = new Project(project);
//   vault.allProjects[vault.allProjects.length - 1].tasks = task;
// }
