// js/project.js
export default class Project {
  constructor(name) {
    this.id = `project-${Date.now()}`; // Unique ID
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodoById(todoId) {
    return this.todos.find((todo) => todo.id === todoId);
  }
}
