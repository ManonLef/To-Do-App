import Task from "./task";
import Project from "./project";

class Storage {
  constructor(name) {
    this.name = name;
    this.projects = [];
  }

  get allProjects() {
    return this.projects;
  }

  set newProject(project) {
    this.projects.push(project);
  }

}

const storage = new Storage("storage");

storage.newProject = new Project("inbox")
storage.newProject = new Project("noob");
storage.newProject = new Project("mek");


function getTaskFromForm() {
  const task = document.querySelector("#task").value;
  const description = document.querySelector("#description").value;
  const due = document.querySelector("#due-date").value;
  const prio = document.querySelector("#priority").value;
  const project = document.querySelector("#project").value;

  return [task, description, due, prio, project];
}

function checkProject(project) {
  for (let i = 0; i < storage.projects.length; i += 1) {
    console.log(storage.projects[i].name)
    if (project === storage.projects[i].name) {
      return i;
    }
  }
  return false;
}



function addTaskToProject(task) {
 if (checkProject(task.project)) {
    const index = checkProject(task.project);
    storage.projects[index].tasks = task;
  } else if (task.project === "inbox") {
    storage.projects[0].tasks = task;
  } else {
    // addTaskToNewProject(task, task.project);
    storage.newProject = new Project(task.project)
    storage.projects[storage.projects.length - 1].tasks = task;
  }
}

function addTaskToNewProject(task, project) {
  storage.newProject = new Project(project);
  storage.allProjects[storage.allProjects.length - 1].tasks = task;
}

function addTaskToInbox(task) {
  storage.projects[0].tasks = task;
}


function workflowNewTask() {
  const taskData = getTaskFromForm(); 
  const newTask = new Task(taskData); 
  return addTaskToProject(newTask);
}



// function returnAllTasks() {
//   const allProjects = getProjects();
//   const allTasks = [];
//   for (let i = 0; i < allProjects.length; i += 1) {
//     for (let j = 0; j < allProjects[i].projectTasks.length; j += 1) {
//       allTasks.push(allProjects[i].projectTasks[j]);
//     }
//   }
//   console.table(allTasks);
//   return allTasks;
// }




// check if project already exists:


// UI output helper functions

function removeProject(index) {
  console.log(`splicing out the project at index number ${index}`);
  return storage.projects.splice(index, 1);
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function getProjects() {
  const projectMirror = storage.projects;
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
  console.table(storage.allProjects);

});
