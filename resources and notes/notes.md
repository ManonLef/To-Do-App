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
- [ ] getters and setters for every task property
