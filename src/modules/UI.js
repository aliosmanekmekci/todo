/**
 * UI Class - Handles all user interface interactions and rendering
 * 
 * This class manages the visual representation of the todo app,
 * handles user interactions, and coordinates between the UI and data models.
 */
import Project from "./Project.js";
import Todo from "./Todo.js";
import { format, parseISO, isValid, addDays } from "date-fns";

export default class UI {
  constructor() {
    this.projects = [];
    this.currentProject = null;
    this.init();
  }

  /**
   * Initialize the UI - load data and set up event listeners
   */
  init() {
    this.loadFromLocalStorage();
    this.initModal();
    this.setupDefaultProject();
  }

  /**
   * Set up a default project if none exist
   */
  setupDefaultProject() {
    if (this.projects.length === 0) {
      this.createProject("Default Project");
    }

    if (!this.currentProject && this.projects.length > 0) {
      this.currentProject = this.projects[0];
    }
  }

  // ==================== PROJECT MANAGEMENT ====================

  /**
   * Create a new project
   * @param {string} name - The name of the project
   * @returns {Project} The newly created project
   */
  createProject(name) {
    const newProject = new Project(name);
    this.projects.push(newProject);
    this.saveToLocalStorage();
    return newProject;
  }

  /**
   * Select a project by its ID
   * @param {string} projectId - The ID of the project to select
   */
  selectProject(projectId) {
    this.currentProject = this.projects.find((p) => p.id === projectId);
    this.renderTodos();
    this.highlightSelectedProject(projectId);
  }

  // ==================== TODO MANAGEMENT ====================

  /**
   * Delete a todo from the current project
   * @param {string} todoId - The ID of the todo to delete
   */
  deleteTodo(todoId) {
    if (this.currentProject) {
      this.currentProject.deleteTodo(todoId);
      this.renderTodos();
      this.saveToLocalStorage();
    }
  }

  /**
   * Toggle the completion status of a todo
   * @param {string} todoId - The ID of the todo to toggle
   */
  toggleTodoComplete(todoId) {
    if (this.currentProject) {
      const todo = this.currentProject.getTodoById(todoId);
      if (todo) {
        todo.toggleComplete();
        this.renderTodos();
        this.saveToLocalStorage();
      }
    }
  }

  // ==================== RENDERING METHODS ====================

  /**
   * Render the projects list in the sidebar
   */
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

  /**
   * Render the todos for the current project
   */
  renderTodos() {
    const todosContainer = document.getElementById("todos-container");
    todosContainer.innerHTML = "<h2>" + this.currentProject.name + "</h2>";

    this.currentProject.todos.forEach((todo) => {
      const todoEl = this.createTodoElement(todo);
      todosContainer.appendChild(todoEl);
    });

    this.addCreateTodoButton(todosContainer);
  }

  /**
   * Create a DOM element for a single todo
   * @param {Todo} todo - The todo object to render
   * @returns {HTMLElement} The created todo element
   */
  createTodoElement(todo) {
    const todoEl = document.createElement("div");
    todoEl.className = `todo ${todo.completed ? "completed" : ""}`;
    
    const formattedDate = this.formatTodoDate(todo.dueDate);
    const priorityClass = `priority-${todo.priority.toLowerCase()}`;
    
    todoEl.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description || "No description"}</p>
      <p class="due-date ${formattedDate.class}">${formattedDate.text}</p>
      <p class="priority ${priorityClass}">Priority: ${todo.priority}</p>
      <button class="toggle-todo" data-id="${todo.id}">
        ${todo.completed ? "Mark Incomplete" : "Complete"}
      </button>
      <button class="delete-todo" data-id="${todo.id}">Delete</button>
    `;
    
    return todoEl;
  }

  /**
   * Add the "Add Todo" button to the todos container
   * @param {HTMLElement} container - The container to add the button to
   */
  addCreateTodoButton(container) {
    const addButton = document.createElement("button");
    addButton.textContent = "+ Add Todo";
    addButton.id = "add-todo-btn";
    addButton.addEventListener("click", () => this.showTodoForm());
    container.appendChild(addButton);
  }

  /**
   * Highlight the selected project in the sidebar
   * @param {string} projectId - The ID of the project to highlight
   */
  highlightSelectedProject(projectId) {
    // Clear all previous selections
    const allProjects = document.querySelectorAll("#projects-list li");
    allProjects.forEach(project => project.classList.remove("selected"));
    
    // Highlight the selected project
    const selectedProject = document.querySelector(`#projects-list li[data-id="${projectId}"]`);
    if (selectedProject) {
      selectedProject.classList.add("selected");
    }
  }

  // ==================== DATE FORMATTING ====================

  /**
   * Format a todo's due date with appropriate styling
   * @param {string} dueDate - The due date string
   * @returns {Object} Object containing formatted text and CSS class
   */
  formatTodoDate(dueDate) {
    if (!dueDate) {
      return { text: "No due date", class: "" };
    }

    try {
      const parsedDate = parseISO(dueDate);
      if (!isValid(parsedDate)) {
        return { text: dueDate, class: "" };
      }

      const now = new Date();
      const diffDays = Math.ceil((parsedDate - now) / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) {
        return {
          text: `Overdue: ${format(parsedDate, "MMM dd, yyyy")}`,
          class: "overdue"
        };
      } else if (diffDays === 0) {
        return { text: "Due today", class: "due-today" };
      } else if (diffDays === 1) {
        return { text: "Due tomorrow", class: "due-soon" };
      } else if (diffDays <= 7) {
        return {
          text: `Due in ${diffDays} days (${format(parsedDate, "MMM dd, yyyy")})`,
          class: "due-soon"
        };
      } else {
        return {
          text: `Due: ${format(parsedDate, "MMM dd, yyyy")}`,
          class: ""
        };
      }
    } catch (error) {
      return { text: dueDate, class: "" };
    }
  }

  // ==================== MODAL SYSTEM ====================

  /**
   * Initialize the modal system and set up event listeners
   */
  initModal() {
    this.modalOverlay = document.getElementById("modal-overlay");
    this.modalTitle = document.getElementById("modal-title");
    this.modalContent = document.getElementById("modal-content");
    this.modalForm = document.getElementById("modal-form");
    this.modalClose = document.getElementById("modal-close");
    this.modalCancel = document.getElementById("modal-cancel");
    this.modalSubmit = document.getElementById("modal-submit");

    this.setupModalEventListeners();
  }

  /**
   * Set up event listeners for the modal
   */
  setupModalEventListeners() {
    this.modalClose.addEventListener("click", () => this.hideModal());
    this.modalCancel.addEventListener("click", () => this.hideModal());
    
    this.modalOverlay.addEventListener("click", (e) => {
      if (e.target === this.modalOverlay) {
        this.hideModal();
      }
    });

    // Prevent modal from closing when clicking inside
    this.modalForm.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  /**
   * Show a modal with the given title, content, and submit handler
   * @param {string} title - The modal title
   * @param {string} content - The modal content HTML
   * @param {Function} onSubmit - Function to call when form is submitted
   */
  showModal(title, content, onSubmit) {
    this.modalTitle.textContent = title;
    this.modalContent.innerHTML = content;
    this.modalForm.onsubmit = (e) => {
      e.preventDefault();
      onSubmit(e);
    };
    this.modalOverlay.classList.add("show");
  }

  /**
   * Hide the modal
   */
  hideModal() {
    this.modalOverlay.classList.remove("show");
    this.modalForm.onsubmit = null;
  }

  // ==================== FORM HANDLERS ====================

  /**
   * Show the project creation form
   */
  showProjectForm() {
    const content = `
      <div class="form-group">
        <label for="project-name">Project Name</label>
        <input type="text" id="project-name" name="name" required placeholder="Enter project name">
      </div>
    `;

    this.showModal("Create New Project", content, (e) => {
      const formData = new FormData(e.target);
      const name = formData.get("name").trim();
      
      if (name) {
        this.createProject(name);
        this.renderProjects();
        this.hideModal();
      }
    });
  }

  /**
   * Show the todo creation form
   */
  showTodoForm() {
    const today = format(new Date(), "yyyy-MM-dd");
    
    const content = `
      <div class="form-group">
        <label for="todo-title">Title *</label>
        <input type="text" id="todo-title" name="title" required placeholder="Enter todo title">
      </div>
      <div class="form-group">
        <label for="todo-description">Description</label>
        <textarea id="todo-description" name="description" placeholder="Enter todo description (optional)"></textarea>
      </div>
      <div class="form-group">
        <label for="todo-due-date">Due Date *</label>
        <input type="date" id="todo-due-date" name="dueDate" required min="${today}" value="${today}">
      </div>
      <div class="form-group">
        <label for="todo-priority">Priority *</label>
        <select id="todo-priority" name="priority" required>
          <option value="">Select priority</option>
          <option value="Low">Low</option>
          <option value="Medium" selected>Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    `;

    this.showModal("Add New Todo", content, (e) => {
      const formData = new FormData(e.target);
      const title = formData.get("title").trim();
      const description = formData.get("description").trim();
      const dueDate = formData.get("dueDate");
      const priority = formData.get("priority");

      if (title && dueDate && priority) {
        this.currentProject.addTodo([title, description, dueDate, priority]);
        this.renderTodos();
        this.saveToLocalStorage();
        this.hideModal();
      }
    });
  }

  // ==================== DATA PERSISTENCE ====================

  /**
   * Save the current state to localStorage
   */
  saveToLocalStorage() {
    const data = {
      projects: this.projects,
      currentProjectId: this.currentProject?.id,
    };
    localStorage.setItem("todoData", JSON.stringify(data));
  }

  /**
   * Load the state from localStorage and reconstruct objects
   */
  loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todoData"));
    if (data) {
      // Reconstruct Project instances from stored data
      this.projects = (data.projects || []).map(projectData => {
        const project = new Project(projectData.name);
        project.id = projectData.id;
        // Reconstruct Todo instances for each project
        project.todos = (projectData.todos || []).map(todoData => {
          const todo = new Todo(
            todoData.title,
            todoData.description,
            todoData.dueDate,
            todoData.priority,
            todoData.projectId
          );
          todo.id = todoData.id;
          todo.completed = todoData.completed;
          return todo;
        });
        return project;
      });
      this.currentProject = this.projects.find((p) => p.id === data.currentProjectId) || null;
    }
  }
}