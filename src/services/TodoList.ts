import { ITodo } from '../interfaces/ITodo';
import { Todo } from '../models/Todo';

export class TodoList {
  private todos: ITodo[] = [];

  async addTodo(title: string): Promise<ITodo> {
    const todo = new Todo(title);
    await this.simulateDelay();
    this.todos.push(todo);
    return todo;
  }

  async removeTodo(id: string): Promise<void> {
    await this.simulateDelay();
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  async toggleTodo(id: string): Promise<void> {
    await this.simulateDelay();
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  async getTodos(): Promise<ITodo[]> {
    await this.simulateDelay();
    return [...this.todos];
  }

  // 비동기 작업을 시뮬레이션하기 위한 private 메소드
  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 100));
  }
}
