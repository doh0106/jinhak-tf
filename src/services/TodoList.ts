import { ITodo } from '../interfaces/ITodo';
import { Todo } from '../models/Todo';

export class TodoList {
  private todos: ITodo[] = [];

  addTodo(title: string): ITodo {
    const todo = new Todo(title);
    this.todos.push(todo);
    return todo;
  }

  removeTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(id: string): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  getTodos(): ITodo[] {
    return [...this.todos];
  }
}