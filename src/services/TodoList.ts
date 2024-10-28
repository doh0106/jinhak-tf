import { ITodo } from '../interfaces/ITodo';
import { ITodoRepository } from '../interfaces/ITodoRepository';
import { TodoFactory } from '../factories/TodoFactory';  // ✅ TodoFactory import

// SRP: ✅ Todo 비즈니스 로직 처리라는 단일 책임을 가짐
// OCP: ✅ 의존성 주입을 통해 저장소를 유연하게 교체 가능
export class TodoList {
  constructor(private repository: ITodoRepository) {}

  async addTodo(title: string): Promise<ITodo> {
    const todo = TodoFactory.createTodo(title);  // ✅ TodoFactory 사용
    return await this.repository.add(todo);
  }

  async removeTodo(id: string): Promise<void> {
    await this.repository.remove(id);
  }

  async toggleTodo(id: string): Promise<void> {
    const todo = await this.repository.findById(id);
    if (todo) {
      todo.completed = !todo.completed;
      await this.repository.update(todo);
    }
  }

  async getTodos(): Promise<ITodo[]> {
    return await this.repository.getAll();
  }
}
