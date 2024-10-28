// SRP: ✅ Todo 아이템의 기본 구조만을 정의하는 단일 책임을 가짐
// OCP: ✅ 인터페이스로 정의되어 있어 구현체를 자유롭게 확장 가능
export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}
