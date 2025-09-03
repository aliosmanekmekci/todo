import Todo from "./modules/Todo.js";
import Project from "./modules/Project.js";
import UI from "./modules/UI.js";

class TodoApp {
  constructor() {
    this.ui = new UI();
    this.init();
  }

  init() {
    this.bindEvents();
    this.ui.renderProjects();
  }

  bindEvents() {
    // Project events
    document.getElementById("new-project-btn").addEventListener("click", () => {
      this.ui.showProjectForm();
    });

    // Todo events
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-todo")) {
        const todoId = e.target.dataset.id;
        this.ui.deleteTodo(todoId);
      }

      if (e.target.classList.contains("toggle-todo")) {
        const todoId = e.target.dataset.id;
        this.ui.toggleTodoComplete(todoId);
      }
    });
  }
}

export default TodoApp;
