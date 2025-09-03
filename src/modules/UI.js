import Project from "./Project.js";

export default class UI {
  constructor() {
    this.projects = [];
    this.currentProject = null;
    this.loadFromLocalStorage();
  }

  createProject(name) {
    const newProject = new Project(name);
    this.projects.push(newProject);
    this.saveToLocalStorage();
    return newProject;
  }
  saveToLocalStorage() {
    const data = {
      projects: this.projects,
      currentProjectId: this.currentProject?.id,
    };
    localStorage.setItem("todoData", JSON.stringify(data));
  }

  loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todoData"));
    if (data) {
      this.projects = data.projects || [];
      this.currentProject = this.projects.find((p) => p.id === data.currentProjectId) || null;
    }
  }

  renderProjects() {
    const projectsList = document.getElementById("projects-list");
    projectsList.innerHTML = "";

    this.projects.forEach((project) => {
      const li = document.createElement("li");
      li.textContent = project.name;
      li.dataset.id = project.id;
      li.addEventListener("click", () => this.selectProject(project.id));
      projectsList.appendChild(li);
    });
  }

  selectProject(projectId) {
    this.currentProject = this.projects.find((p) => p.id === projectId);
    this.renderTodos();
  }

  renderTodos() {
    const todosContainer = document.getElementById("todos-container");
    todosContainer.innerHTML = "<h2>" + this.currentProject.name + "</h2>";

    this.currentProject.todos.forEach((todo) => {
      const todoEl = document.createElement("div");
      todoEl.className = `todo ${todo.completed ? "completed" : ""}`;
      todoEl.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <p>Due: ${todo.dueDate}</p>
      <p>Priority: ${todo.priority}</p>
      <button class="toggle-todo" data-id="${todo.id}">
        ${todo.completed ? "Mark Incomplete" : "Complete"}
      </button>
      <button class="delete-todo" data-id="${todo.id}">Delete</button>
    `;
      todosContainer.appendChild(todoEl);
    });

    // Add "Add Todo" button
    const addButton = document.createElement("button");
    addButton.textContent = "+ Add Todo";
    addButton.id = "add-todo-btn";
    addButton.addEventListener("click", () => this.showTodoForm());
    todosContainer.appendChild(addButton);
  }

  showProjectForm() {
    // Implement project form modal
    const name = prompt("Enter project name:");
    if (name) {
      this.createProject(name);
      this.renderProjects();
    }
  }

  showTodoForm() {
    // Implement todo form modal
    const title = prompt("Enter todo title:");
    const description = prompt("Enter todo description:");
    const dueDate = prompt("Enter due date (YYYY-MM-DD):");
    const priority = prompt("Enter priority (Low, Medium, High):");

    if (title && dueDate && priority) {
      this.currentProject.addTodo([title, description, dueDate, priority]);
      this.renderTodos();
      this.saveToLocalStorage();
    }
  }

  // Add other UI methods here...
}
