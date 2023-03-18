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
  return project
}

// default project = inbox
const inbox = newProject("inbox");

function addTaskToInbox(task) {
  inbox.tasks = task;
}

function addTaskToNewProject(task, project) {
  newProject(project);
  projects[projects.length-1].tasks = task
}

function addTaskToProject(task, project) {
  // if undefined or inbox; put in inbox, 
  if (project === "inbox" || !project) {
    addTaskToInbox(task)
  } else {
    addTaskToNewProject(task, project)
  }
  console.log({projects})
}

export { addTaskToProject }
//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

