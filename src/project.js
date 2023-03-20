class Project {
  constructor(name) {
    this.name = name;
    this.projectTasks = [];
  }

  get tasks() {
    return this.projectTasks;
  }

  set tasks(add) {
    this.projectTasks.push(add);
  }

  get projectName() {
    return this.name;
  }
  
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
  for (let i = 0; i < projects.length; i += 1) {
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

// UI output helper functions
function showAllProjectNames() {
  for (let i = 0; i < projects.length; i += 1) {
    console.log(
      `TEST function showAllProjectNames. Currently on run ${i} ${projects[i].projectName}`
    );
  }
}

function removeProject(index) {
  console.log(`splicing out the project at index number ${index}`);
  return projects.splice(index, 1);
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||| • New Functionality • |||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function getProjects() {
  const projectMirror = projects;
  console.log(`this is the project mirror function running ${projectMirror}`);
  return projectMirror;
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

function showProjectsTEST() {
  for (let i = 0; i < projects.length; i += 1) {
    console.log(
      `TEST function show projects and their tasks in a table. Currently on run ${i}`
    );
    console.table(projects[i].tasks);
  }
  showAllProjectNames();
}

//  --------------------------------------------------------------------------
//  ||||||||||||||||||||||||||||||| • Exports • ||||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

export { showProjectsTEST, addTaskToProject, removeProject, getProjects, Project };