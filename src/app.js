/**
 * TodoApp Class - Main application controller
 * 
 * This class initializes the todo application and sets up event listeners.
 * It acts as the bridge between the UI and the underlying data management.
 */
import Todo from "./modules/Todo.js";
import Project from "./modules/Project.js";
import UI from "./modules/UI.js";

class TodoApp {
  constructor() {
    this.ui = new UI();
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.bindEvents();
    this.ui.renderProjects();
  }

  /**
   * Bind all event listeners for the application
   */
  bindEvents() {
    this.bindProjectEvents();
    this.bindTodoEvents();
  }

  /**
   * Bind events related to project management
   */
  bindProjectEvents() {
    const newProjectBtn = document.getElementById("new-project-btn");
    if (newProjectBtn) {
      newProjectBtn.addEventListener("click", () => {
        this.ui.showProjectForm();
      });
    }
  }

  /**
   * Bind events related to todo management
   * Uses event delegation for dynamically created todo buttons
   */
  bindTodoEvents() {
    document.addEventListener("click", (e) => {
      // Handle delete todo button clicks
      if (e.target.classList.contains("delete-todo")) {
        const todoId = e.target.dataset.id;
        this.ui.deleteTodo(todoId);
      }

      // Handle toggle complete button clicks
      if (e.target.classList.contains("toggle-todo")) {
        const todoId = e.target.dataset.id;
        this.ui.toggleTodoComplete(todoId);
      }
    });
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TodoApp();
});

export default TodoApp;