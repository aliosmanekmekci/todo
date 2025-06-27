// src/js/main.js
import Project from "./project.js";
import { Storage } from "./storage.js";
import Todo from "./todo.js";
import { UI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- APPLICATION STATE ---
  let projects = Storage.loadProjects();
  let selectedProjectId = projects.length > 0 ? projects[0].id : null;

  // --- DOM ELEMENTS ---
  const newProjectForm = document.getElementById("new-project-form");
  // THIS LINE WAS MISSING FROM MY PREVIOUS INSTRUCTIONS
  const newProjectInput = document.getElementById("new-project-input");
  const projectList = document.getElementById("project-list");
  const newTodoForm = document.getElementById("new-todo-form");
  const todoListContainer = document.getElementById("todo-list");
  const addTodoButton = document.getElementById("add-todo-button");
  const todoModal = document.getElementById("todo-modal");
  const closeModalButton = document.querySelector(".close-button");

  // --- FUNCTIONS ---
  function render() {
    Storage.saveProjects(projects);
    UI.renderProjects(projects, selectedProjectId);
    const selectedProject = projects.find((p) => p.id === selectedProjectId);
    UI.renderTodos(selectedProject);
  }

  function getSelectedProject() {
    return projects.find((p) => p.id === selectedProjectId);
  }

  // --- EVENT LISTENERS ---

  // Project Creation and Selection (same as before)
  newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault(); // This is the crucial line that stops the refresh
    const projectName = newProjectInput.value;
    if (projectName) {
      const newProject = new Project(projectName);
      projects.push(newProject);
      selectedProjectId = newProject.id;
      UI.clearForm("new-project-form");
      render();
    }
  });
  projectList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      selectedProjectId = e.target.dataset.projectId;
      render();
    }
  });

  // Open "Add Todo" Modal
  addTodoButton.addEventListener("click", () => {
    UI.clearForm("new-todo-form");
    UI.showModal();
  });

  // Close Modal
  // The corrected lines
  closeModalButton.addEventListener("click", () => {
    UI.hideModal();
  });

  window.addEventListener("click", (e) => {
    if (e.target === todoModal) {
      UI.hideModal();
    }
  });

  // Handle Todo Form Submission (for both Add and Edit)
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("todo-title").value;
    const description = document.getElementById("todo-description").value;
    const dueDate = document.getElementById("todo-dueDate").value;
    const priority = document.getElementById("todo-priority").value;
    const todoId = document.getElementById("todo-id").value;

    const selectedProject = getSelectedProject();
    if (!title || !selectedProject) return;

    if (todoId) {
      // If there's an ID, we're editing
      const todo = selectedProject.getTodoById(todoId);
      todo.title = title;
      todo.description = description;
      todo.dueDate = dueDate;
      todo.priority = priority;
    } else {
      // Otherwise, we're adding a new one
      const newTodo = new Todo(title, description, dueDate, priority);
      selectedProject.addTodo(newTodo);
    }

    UI.hideModal();
    render();
  });

  // Handle Todo clicks (Delete, Edit, Complete)
  todoListContainer.addEventListener("click", (e) => {
    const todoItem = e.target.closest(".todo-item");
    if (!todoItem) return;

    const todoId = todoItem.dataset.todoId;
    const selectedProject = getSelectedProject();

    // Handle Delete
    if (e.target.classList.contains("delete-todo-btn")) {
      selectedProject.removeTodo(todoId);
      render();
    }

    // Handle Edit
    if (e.target.classList.contains("edit-todo-btn")) {
      const todo = selectedProject.getTodoById(todoId);
      UI.populateEditForm(todo);
      UI.showModal();
    }

    // Handle Complete
    if (e.target.classList.contains("todo-complete-checkbox")) {
      const todo = selectedProject.getTodoById(todoId);
      if (todo) {
        todo.toggleComplete(); // Make sure this method exists in your Todo class!
        render();
      }
    }
  });

  // --- INITIAL RENDER ---
  render();
});
