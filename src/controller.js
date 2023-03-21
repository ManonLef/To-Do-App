import Task from "./task";
import Project from "./project";

const Storage = {
  projects: [],

  get allProjects() {
    return this.projects;
  },

  addProject(project) {
    this.projects.push(project);
  },
};

// class Storage {
//   constructor(name) {
//     this.name = name;
//     this.projects = [];
//   }

//   get allProjects() {
//     return this.projects
//   }

//   set newProject(project) {
//     this.projects.push(project)
//   }
// }

function getTaskFromForm() {
  const task = document.querySelector("#task").value;
  const description = document.querySelector("#description").value;
  const due = document.querySelector("#due-date").value;
  const prio = document.querySelector("#priority").value;
  const project = document.querySelector("#project").value;

  return [task, description, due, prio, project];
}

function workflowNewTask() {
  //  - User presses new task button and a form pops up > DOM
  // - User enters details and hits submit > data entered will be transformed to an array > listener in controller?
  const taskData = getTaskFromForm(); // will be an array of data
  // - array will be used to create a task > controller > to do module
  // - to do module will send back the created task to the controller > to do module > controller
  const newTask = new Task(taskData); // will be a new task object
  const project = newTask.project;
  // test
  // - controller will send this data to the project manager to store it in the correct project. controller > project module
  return addTaskToProject(newTask, project);
}

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

function showProjectsTEST() {
  for (let i = 0; i < Storage.projects.length; i += 1) {
    console.log(
      `TEST function show projects and their tasks in a table. Currently on run ${i}`
    );
    console.table(Storage.projects[i].tasks);
  }
  showAllProjectNames();
}

function showAllProjectNames() {
  for (let i = 0; i < Storage.projects.length; i += 1) {
    console.log(
      `TEST function showAllProjectNames. Currently on run ${i} ${Storage.projects[i].projectName}`
    );
  }
}


// all projects
//const projects = [];

// create a new Project
function newProject(projectName) {
  const project = new Project(projectName);
  Storage.addProject(project);
  return project;
}

// default project = inbox
const inbox = newProject("inbox");

function addTaskToInbox(task) {
  inbox.tasks = task;
}

function addTaskToNewProject(task, project) {
  newProject(project);
  Storage.projects[Storage.projects.length - 1].tasks = task;
}

// check if project already exists:
function checkProject(project) {
  // projects are stored inside the const projects
  // check if the project array contains the project
  for (let i = 0; i < Storage.projects.length; i += 1) {
    // if there's a match with the name, return the project index inside array
    if (project === Storage.projects[i].name) {
      return i;
    }
  }
  return false;
}

function addTaskToProject(task, project) {
  if (project === "inbox" || !project) {
    addTaskToInbox(task);
  } else if (checkProject(project)) {
    const index = checkProject(project);
    Storage.projects[index].tasks = task;
  } else {
    addTaskToNewProject(task, project);
  }
}

// UI output helper functions


function removeProject(index) {
  console.log(`splicing out the project at index number ${index}`);
  return Storage.projects.splice(index, 1);
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function getProjects() {
  const projectMirror = Storage.projects;
  console.log(`this is the project mirror function running ${projectMirror}`);
  return projectMirror;
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

//  --------------------------------------------------------------------------
//  ||||||||||||||||||||||||||||||| • Exports • ||||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------



document.querySelector("button").addEventListener("click", () => {
  workflowNewTask();
  showProjectsTEST();
  returnAllTasks();
});

