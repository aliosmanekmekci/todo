// js/storage.js
import Project from "./project.js";
import Todo from "./todo.js";

export class Storage {
  static saveProjects(projects) {
    localStorage.setItem("todoProjects", JSON.stringify(projects));
  }

  static loadProjects() {
    const projectsJSON = localStorage.getItem("todoProjects");
    if (!projectsJSON) {
      // If no projects found, create a default one
      const defaultProject = new Project("Default Project");
      return [defaultProject];
    }

    const projectsData = JSON.parse(projectsJSON);

    // Re-hydrate the plain objects into class instances
    const projects = projectsData.map((projectData) => {
      const project = new Project(projectData.name);
      project.id = projectData.id; // Preserve the original ID
      project.todos = projectData.todos.map((todoData) => {
        const todo = new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
        todo.id = todoData.id; // Preserve original ID
        todo.complete = todoData.complete;
        return todo;
      });
      return project;
    });

    return projects;
  }
}
