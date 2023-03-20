import { getProjects } from "./project-manager";

class Task {
  constructor(task, description, dueDate, priority, project) {
    this.task = task;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
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

function createTask(taskdata) {
  const taskDetails = taskdata;
  const newTask = new Task(taskDetails[0], taskDetails[1], taskDetails[2], taskDetails[3], taskDetails[4]);
  return newTask;
}

export {createTask, returnAllTasks}
//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------



//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

// createTask(taskInfo); // this task has no project assigned and should end up in the inbox
// createTask([
//   "this task should go to inbox",
//   "it's a pretty awesome inbox task",
//   "none",
//   "low",
//   "inbox",
// ]);
// createTask([
//   "this will go into the bin project",
//   "it's binny",
//   "tomorrow",
//   "high",
//   "bin",
// ]);
// createTask([
//   "hug a tree",
//   "this task is for instagram hug a tree day",
//   "before hug a tree day",
//   "low",
//   "insta",
// ]);
// createTask([
//   "insta 2",
//   "this task is for instagram hug a tree day",
//   "before hug a tree day",
//   "low",
//   "insta",
// ]);
// createTask([
//   "insta 3",
//   "this task is for instagram hug a tree day",
//   "before hug a tree day",
//   "low",
//   "insta",
// ]);
// createTask(["empty project should end in inbox", "", "", "", ""]);

// // testing functions
// showProjectsTEST();
// returnAllTasks();

// // testing the removeProject functionality from project-manager
// removeProject(0);
// showProjectsTEST();

