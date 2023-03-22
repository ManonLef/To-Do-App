import _ from "lodash";
import Task from "./task";
import Project from "./project";


class Storage {
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


const storage = new Storage("storage");

if (localStorage.getItem("array")) {
  retrieveStore()
  }

function store() {
  localStorage.removeItem("array");

  const myStorage = storage.projects;
  const jsonArray = JSON.stringify(myStorage);
  console.log(jsonArray);

  localStorage.setItem("array", jsonArray);
}

function retrieveStore() {
    // get the JSON string from localStorage
    const str = localStorage.getItem("array");

    // convert JSON string to relevant object
    const parsedArray = JSON.parse(str);
    console.log(parsedArray);
  
    function returnProto() {
      for (let i = 0; i < parsedArray.length; i++) {
       Object.setPrototypeOf(parsedArray[i], Project.prototype);
      }
    }
  
    returnProto()
    console.log(parsedArray);
    return (storage.projects = parsedArray);  
}

console.log(storage.projects);

function getTaskFromForm() {
  const task = document.querySelector("#task").value;
  const description = document.querySelector("#description").value;
  const due = document.querySelector("#due-date").value;
  const prio = document.querySelector("#priority").value;
  const project = document.querySelector("#project").value;

  return [task, description, due, prio, project];
}

function addTaskToProject(task) {
  // check to see if project already exists
  const index = _.findIndex(storage.projects, { name: task.project });
  if (index >= 0) {
    // Wouter: geef het object een moeder!
    storage.projects[index].tasks = task;
  } else {
    storage.newProject = task.project;
    storage.projects[storage.projects.length - 1].tasks = task;
  }
  store();
}

function workflowNewTask() {
  const newTask = new Task(getTaskFromForm());
  addTaskToProject(newTask);
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function returnAllTasks() {
  const allProjects = getProjects();
  const allTasks = [];
  for (let i = 0; i < allProjects.length; i += 1) {
    for (let j = 0; j < allProjects[i].projectTasks.length; j += 1) {
      allTasks.push(allProjects[i].projectTasks[j]);
    }
  }
  console.table(allTasks);
  return allTasks;
}

function getProjects() {
  const projectMirror = storage.projects;
  console.log(`this is the project mirror function running ${projectMirror}`);
  return projectMirror;
}

function removeProject(index) {
  console.log(`splicing out the project at index number ${index}`);
  return storage.projects.splice(index, 1);
}

function addTaskToNewProject(task, project) {
  storage.newProject = new Project(project);
  storage.allProjects[storage.allProjects.length - 1].tasks = task;
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||||| • Listeners • |||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------
document.querySelector("button").addEventListener("click", () => {
  workflowNewTask();
  returnAllTasks();
  console.table(storage.projects);
  console.log(storage.allProjects);
});
