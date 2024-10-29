import { ITodo } from "./ITodo";

// SRP: ✅ Todo 아이템의 문자열 포맷팅 방식을 정의하는 단일 책임을 가짐
// OCP: ✅ 인터페이스로 정의되어 있어 다양한 포맷팅 구현을 허용
export interface ITodoFormatter {
  format(todo: ITodo, template: string): string;
}
