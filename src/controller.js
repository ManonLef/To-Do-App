import { createTask } from "./to-do-manager";
import { showProjectsTEST, addTaskToProject, getProjects } from "./project-manager";


function getTaskFromForm() {
  const task = document.querySelector("#task").value;
  const description = document.querySelector("#description").value;
  const due = document.querySelector("#due-date").value;
  const prio = document.querySelector("#priority").value;
  const project = document.querySelector("#project").value;

  return [task, description, due, prio, project];
}

// - User enters details and hits submit > data entered will be transformed to an array > listener in controller?

function workflowNewTask() {
  //  - User presses new task button and a form pops up > DOM
  // - User enters details and hits submit > data entered will be transformed to an array > listener in controller?
  const taskData = getTaskFromForm(); // will be an array of data
  // - array will be used to create a task > controller > to do module
  // - to do module will send back the created task to the controller > to do module > controller
  const newTask = createTask(taskData) // will be a new task object
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

document.querySelector("button").addEventListener("click", () => {
  workflowNewTask();
  showProjectsTEST();
  returnAllTasks();
});

