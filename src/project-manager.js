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
const projects = [];

// create a new Project
function newProject(projectName) {
  const project = new Project(projectName);
  projects.push(project);
  return project;
}

// default project = inbox
const inbox = newProject("inbox");

function addTaskToInbox(task) {
  inbox.tasks = task;
}

function addTaskToNewProject(task, project) {
  newProject(project);
  projects[projects.length - 1].tasks = task;
}

// check if project already exists:
function checkProject(project) {
  // projects are stored inside the const projects
  // check if the project array contains the project
  for (let i = 0; i < projects.length; i++) {
    // if there's a match with the name, return the project index inside array
    if (project === projects[i].name) {
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
    projects[index].tasks = task;
  } else {
    addTaskToNewProject(task, project);
  }
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function showProjects() {
  for (let i = 0; i < projects.length; i++) {
    console.table(projects[i].tasks);
  }
}

export { showProjects, addTaskToProject };
