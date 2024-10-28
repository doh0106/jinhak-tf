import { ITodo } from "./ITodo";
// SRP: ✅ Todo 저장소의 기본 동작만을 정의하는 단일 책임을 가짐
// OCP: ✅ 인터페이스로 정의되어 있어 다양한 저장소 구현(API, 메모리, DB 등)을 허용
export interface ITodoRepository {
  add(todo: ITodo): Promise<ITodo>;
  remove(id: string): Promise<void>;
  update(todo: ITodo): Promise<void>;
  getAll(): Promise<ITodo[]>;
  findById(id: string): Promise<ITodo | undefined>;
}
