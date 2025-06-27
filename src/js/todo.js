// js/todo.js
export default class Todo {
  constructor(title, description, dueDate, priority) {
    this.id = `todo-${Date.now()}`; // Unique ID for each todo
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }

  // You can add methods here later, like:
  // toggleComplete() { this.complete = !this.complete; }
  // setPriority(newPriority) { this.priority = newPriority; }
}
