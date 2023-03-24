## 20230318

To be honest I'm massively intimidated by this project. Not because of the project description, but because of all the chats I've seen about this project in the TOP Discord. Apparently it's just a very big project. Curious how I'll experience it.

- I set up webpack first just like I did for the restaurant project.
- I went for a basic setup again since I expect to be mostly focusing on code first and not the UI or DOM items. When I get there i'll add the styleloaders etc.
- Then I followed my ESLint/Prettier setup workflow.
  - I had to pick between regular JS (import/export) and CommonJS (require) I believe. I picked regular but saw ESLint throw an error in the webpack config due to the require in there. I've added an `.eslintignore` for now for the webpack.config file.

### Organization Brainstorm.
- I want to make this code as modular as I can and revisit the SOLID principles as I go to see if I understood them and can implement them.
- I'll install my things3app to see how it works again
- separate the DOM entirely from the scripts/modules
- Object Role Stereotypes from [this article](http://aspiringcraftsman.com/2011/12/08/solid-javascript-single-responsibility-principle/) and how I think they translate to this project:
  - Information holder: an object designed to know certain information and provide that information to other objects.
    - the created to-do items
    - maybe the projects
  - Structurer: an object that maintains relationships between objects and information about those relationships.
    - maybe an array of collection of projects and their to-do's. Able to change todo's from one project to another
  - Service Provider: an object that performs specific work and offers services to others on demand.
    - not sure about this one, perhaps things like edit buttons, deletion options
  - Coordinator – an object that doesn’t make many decisions but, in a rote or mechanical way, delegates work to other objects.
    - like a controller perhaps? When a button is pressed it determines and delegates? Event listeners for example?

## What broad modules do I expect to have and what will they do?

### projects module
- create and manage projects 

### to do module
- will create and manage all the todos, add, delete, edit

### UI/viewport module
- will contain all the DOM stuff

## End of day
- I have mostly worked on the project and task module.
- the tasks get created in the to-do-manager module and are then sent to the project-manager module for further processing.

For later: 
- [x] for the addTaskToProject function, add some sort of check if the project is an existing one, not being inbox.
- [ ] consider some sort of controller in between. Tasks get sent there, it decides how it should be sent to the project manager. It should probably have access to some kind of storage module as well where all the projects are stored.

## 20230319 
- I added a check for existing project not being inbox. The addTask to project function now does have a bunch of if/else which I think is not desirable. Will have to ponder an alternative setup. 

Things to probably create:
- [x] function to remove a project
- [x] function to return all tasks
- [ ] function to remove a task from a project
  - [ ] add task property unique id to accomplish this
- [ ] getters and setters for every task property

## 20230319-2
- I made a basic form to play around a bit with ui 
- [ ] set task project to inbox when none defined.

## 20230320
After sleeping over the setup I still felt something was missing from my code. Some functions still end with calling another function. I feel like a pubsub kind of implementation would be nicer but instead of handling this with a plugin, I'd much rather set up a different way. And I'm thinking of implementing a controller that gathers information from the other modules and uses said information.

### Pseudocode example a new task gets created:
- User presses new task button and a form pops up > DOM
- User enters details and hits submit > data entered will be transformed to an array > listener in controller?
- array will be used to create a task > controller > to do module
- to do module will send back the created task to the controller > to do module > controller
- controller will send this data to the project manager to store it in the correct project. controller > project module

### After pseudocode implementation
- the above starts feeling very unintuitive. Perhaps I should start considering adding classes inside the projects upon creation. Which would basically mean someone should first create a project before tasks can be added to it. I'll try to rewrite it as such for that way the project could be filled with tasks from the project module only.

## 20230322 Local Storage Jump
I have been working mostly on refactoring the code, worrying about closure, global storage, limiting cross dependency etc.

All in all very happy about the progress the basic functionality was in place quite quickly. Some issues with local storage were to be expected:
- the String parsing output the array of objects nicely. But the objects made from classes lost their prototype functions. This was rather quickly fixed by setting their prototype again.

- [ ] Don't forget to remove dev mode for the final build

### UUID
I'm looking into UUID generation. I am planning to use this uuid for targeting specific tasks eventually.
- I decided to go for a simple `new Date().getTime().toString()` id creation. There are multiple uuid generators but I feel like it's overkill for this usage.

## 20230324

I want to start taking the first steps into the viewport planning for now.
Things to consider:
- what information from the `controller` does the DOM need to be able to render? export just that plain info as needed with the needed uuid to identify input actions
- to render ideas:
  - projects created
  - when clicking on a project: tasks in said project

### Still Needed functionality before I move to DOM
- [ ] create a function to return only the tasks inside a project
- [ ] marking todo's as complete
- [x] function to change project name
- [ ] function to change task name
- [ ] function to change task priority
- [ ] function to change dueDate
- [ ] function to remove a project
- [x] function to remove a single task
- [x] function to target a task by uuid


### Optional functionality 
- [ ] create a function to filter based on priority
- [ ] look into date-fns for formatting and manipulating times/dates [here](https://github.com/date-fns/date-fns)
- [ ] consider option to remove project but move tasks to the inbox


