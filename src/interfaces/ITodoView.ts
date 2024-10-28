import { ITodo } from "./ITodo";
// SRP: ✅ Todo 표시 방식의 인터페이스 정의라는 단일 책임을 가짐
// OCP: ✅ 인터페이스로 정의되어 있어 다양한 뷰 구현(콘솔, 웹, 모바일 등)을 허용
export interface ITodoView {
  displayTodos(todos: ITodo[]): void;
}
