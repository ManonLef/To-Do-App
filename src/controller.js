import _ from "lodash";
import Task from "./task";
import Project from "./project";

class Storage {
  constructor(name) {
    this.name = name;
    this.projects = [new Project("default"), new Project("noob")];
  }

  get allProjects() {
    return this.projects;
  }

  set newProject(project) {
    this.projects.push(new Project(project));
  }

}

// default storage for testing
const storage = new Storage("storage");

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
    return storage.projects[index].tasks = task;
  } else {
    storage.newProject = (task.project);
    return storage.projects[storage.projects.length - 1].tasks = task;
  }
}

function workflowNewTask() {
  const newTask = new Task(getTaskFromForm());
  return addTaskToProject(newTask);
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