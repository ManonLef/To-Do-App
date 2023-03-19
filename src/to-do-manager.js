import taskInfo from "./input-collector";
import {
  showProjectsTEST,
  addTaskToProject,
  getProjects,
} from "./project-manager";

// todo Class creates default todo with multiple properties
class Task {
  constructor(task, description, dueDate, priority, project) {
    this.task = task;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }
}

// create new task. I want to import the data for it somewhere. Currently I've stored it in the input-collector
// since I'm not entirely sure yet where it will get its data from and which modules it should travel.
function createTask(info) {
  const newTask = new Task(info[0], info[1], info[2], info[3], info[4]);
  // test
  addTaskToProject(newTask, info[4]);
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------

// displays all tasks regardless of project 
function returnAllTasks() {
  const allProjects = getProjects();
  console.log("made it inside displayAllTasks function");
  for (let i = 0; i < allProjects.length; i += 1) {
    // for each project, display each task in it
    for (let j = 0; j < allProjects[i].projectTasks.length; j += 1) {
      console.table(allProjects[i].projectTasks[j].task);
    }
  }
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

createTask(taskInfo); // this task has no project assigned and should end up in the inbox
createTask([
  "this task should go to inbox",
  "it's a pretty awesome inbox task",
  "none",
  "low",
  "inbox",
]);
createTask([
  "this will go into the bin project",
  "it's binny",
  "tomorrow",
  "high",
  "bin",
]);
createTask([
  "hug a tree",
  "this task is for instagram hug a tree day",
  "before hug a tree day",
  "low",
  "insta",
]);
createTask([
  "insta 2",
  "this task is for instagram hug a tree day",
  "before hug a tree day",
  "low",
  "insta",
]);
createTask([
  "insta 3",
  "this task is for instagram hug a tree day",
  "before hug a tree day",
  "low",
  "insta",
]);
createTask(["empty project should end in inbox", "", "", "", ""]);

// testing functions
showProjectsTEST();
returnAllTasks();

// // testing the removeProject functionality from project-manager
// removeProject(0);
// showProjectsTEST();
