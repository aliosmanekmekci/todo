export default class Todo {
  constructor(title, description, dueDate, priority, projectId) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
    this.projectId = projectId;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  updateDetails(updates) {
    Object.assign(this, updates);
  }
}
