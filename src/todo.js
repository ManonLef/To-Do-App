// todo Class

// - title
// - description
// - dueDate
// - priority
// - notes
// - checklist

class ToDo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Testing area
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// test toDo
const todoOne = new ToDo(
  "take out garbage",
  "do it soon",
  "by tomorrow",
  "low"
);

// test export toDo
function showTodo() {
  console.log(todoOne);
}

export { showTodo as default };
