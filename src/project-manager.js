class Project {
  constructor(name) {
    this.name = name;
  }

  projectTasks = [];

  get tasks() {
    return this.projectTasks;
  }

  set tasks(add) {
    this.projectTasks.push(add);
  }

  get projectName() {
    return this.name;
  }
  // change project name
  
  set projectName(newName) {
    this.name = newName;
  }
}

// all projects
const projects = []

// create a new Project
function newProject(projectName) {
  const project = new Project(projectName)
  projects.push(project)
  console.log(projects)
  return project
}

// default project = inbox
const inbox = newProject("inbox");

export default function addTaskToInbox(task) {
  inbox.tasks = task;
  // test setter
  console.log(inbox.name, inbox.tasks) // logs all tasks currently inside this project
  console.log(inbox.tasks[0].title); // logs title of first tasks
}


//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

newProject("Project1")
newProject("Project 2")
newProject("project 3")
