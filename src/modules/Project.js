import Todo from "./Todo.js";
 
export default class Project {
  constructor(name) {
    this.id = Date.now().toString();
    this.name = name;
    this.todos = [];
  }

  addTodo(todoData) {
    const newTodo = new Todo(...todoData, this.id);
    this.todos.push(newTodo);
    return newTodo;
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodoById(todoId) {
    return this.todos.find((todo) => todo.id === todoId);
  }
}
