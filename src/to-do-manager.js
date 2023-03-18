import taskInfo from "./input-collector";
import addTaskToInbox from "./project-manager";

// todo Class creates default todo with multiple properties
class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

// create new task. I want to import the data for it somewhere. Currently I've stored it in the input-collector
// since I'm not entirely sure yet where it will get its data from and which modules it should travel.
function createTask(info) {
  const newTask = new Task(info[0], info[1], info[2], info[3]);
  // test
  addTaskToInbox(newTask);
}

//  --------------------------------------------------------------------------
//  |||||||||||||||||||||||||||| • Testing area • ||||||||||||||||||||||||||||
//  --------------------------------------------------------------------------

createTask(taskInfo);
createTask(["yes", "no", "maybe", "someday"]);
createTask(["clean fridge", 'f', 'f', 'g'])
