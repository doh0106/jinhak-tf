import { ITodo } from "./ITodo";

// SRP: ✅ Todo 아이템의 상태 변경 방식을 정의하는 단일 책임을 가짐
// OCP: ✅ 인터페이스로 정의되어 있어 다양한 상태 관리 구현을 허용
export interface ITodoStateManager {
  toggleState(todo: ITodo): void;
}
