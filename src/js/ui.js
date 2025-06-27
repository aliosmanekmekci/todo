// src/js/ui.js
import { format, parseISO } from "date-fns";

export class UI {
  // --- Modal Handling ---
  static showModal() {
    document.getElementById("todo-modal").classList.remove("hidden");
  }

  static hideModal() {
    document.getElementById("todo-modal").classList.add("hidden");
    this.clearForm("new-todo-form");
  }

  // --- Rendering ---
  static renderProjects(projects, selectedProjectId) {
    // ... (same as before)
  }

  static renderTodos(project) {
    const todoList = document.getElementById("todo-list");
    const projectTitle = document.getElementById("current-project-title");
    const addTodoButton = document.getElementById("add-todo-button");

    todoList.innerHTML = "";

    if (!project) {
      projectTitle.textContent = "Select a Project";
      addTodoButton.classList.add("hidden");
      return;
    }

    projectTitle.textContent = project.name;
    addTodoButton.classList.remove("hidden");

    project.todos.forEach((todo) => {
      const todoEl = document.createElement("div");
      todoEl.classList.add("todo-item", `priority-${todo.priority}`);
      todoEl.dataset.todoId = todo.id;
      if (todo.complete) todoEl.classList.add("complete");

      // Format the date for display, handle empty dates
      const formattedDate = todo.dueDate ? format(parseISO(todo.dueDate), "MMM dd") : "No Date";

      todoEl.innerHTML = `
                <div class="todo-item-main">
                    <input type="checkbox" class="todo-complete-checkbox" ${todo.complete ? "checked" : ""}>
                    <span class="title">${todo.title}</span>
                </div>
                <div class="todo-item-details">
                    <span class="dueDate">${formattedDate}</span>
                    <button class="edit-todo-btn">Edit</button>
                    <button class="delete-todo-btn">×</button>
                </div>
            `;
      todoList.appendChild(todoEl);
    });
  }

  static populateEditForm(todo) {
    document.getElementById("modal-title").textContent = "Edit Todo";
    document.getElementById("todo-id").value = todo.id;
    document.getElementById("todo-title").value = todo.title;
    document.getElementById("todo-description").value = todo.description;
    document.getElementById("todo-dueDate").value = todo.dueDate;
    document.getElementById("todo-priority").value = todo.priority;
  }

  static clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
    // Also clear the hidden ID input for the modal form
    if (formId === "new-todo-form") {
      document.getElementById("todo-id").value = "";
      document.getElementById("modal-title").textContent = "Add New Todo";
    }
  }
}
