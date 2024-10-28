import fetch from 'cross-fetch';
import { ITodo } from '../interfaces/ITodo';
import { ITodoRepository } from '../interfaces/ITodoRepository';

// SRP: ✅ API를 통한 Todo 데이터 관리라는 단일 책임을 가짐
// OCP: ✅ ITodoRepository 인터페이스를 구현하여, 다른 코드 수정 없이 새로운 저장소로 교체 가능
export class ApiTodoRepository implements ITodoRepository {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async add(todo: ITodo): Promise<ITodo> {
    const response = await fetch(`${this.apiBaseUrl}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
    
    if (!response.ok) {  // ✅ 응답 상태 확인
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async remove(id: string): Promise<void> {
    await fetch(`${this.apiBaseUrl}/todos/${id}`, {
      method: 'DELETE'
    });
  }

  async update(todo: ITodo): Promise<void> {
    await fetch(`${this.apiBaseUrl}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
  }

  async getAll(): Promise<ITodo[]> {
    const response = await fetch(`${this.apiBaseUrl}/todos`);
    return response.json();
  }

  async findById(id: string): Promise<ITodo | undefined> {
    const response = await fetch(`${this.apiBaseUrl}/todos/${id}`);
    if (!response.ok) return undefined;
    return response.json();
  }
}
