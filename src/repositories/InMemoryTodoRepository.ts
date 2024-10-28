import { ITodo } from '../interfaces/ITodo';
import { ITodoRepository } from '../interfaces/ITodoRepository';

// SRP: ✅ 메모리 내 Todo 데이터 관리라는 단일 책임을 가짐
// OCP: ✅ ITodoRepository 인터페이스를 구현하여, 다른 코드 수정 없이 새로운 저장소로 교체 가능
export class InMemoryTodoRepository implements ITodoRepository {
  private todos: ITodo[] = [];

  async add(todo: ITodo): Promise<ITodo> {
    this.todos.push(todo);
    return todo;
  }

  async remove(id: string): Promise<void> {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  async update(todo: ITodo): Promise<void> {
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todos[index] = todo;
    }
  }

  async getAll(): Promise<ITodo[]> {
    return [...this.todos];
  }

  async findById(id: string): Promise<ITodo | undefined> {
    return this.todos.find(todo => todo.id === id);
  }
}
