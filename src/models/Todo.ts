import { v4 as uuidv4 } from 'uuid';
import { ITodo } from '../interfaces/ITodo';

// SRP: ✅ Todo 아이템의 생성과 기본 상태 관리라는 단일 책임을 가짐
// OCP: ✅ ITodo 인터페이스를 구현하여 확장 가능하며, 내부 구현을 변경해도 다른 코드에 영향을 주지 않음
export class Todo implements ITodo {
  id: string;
  title: string;
  completed: boolean;

  constructor(title: string) {
    this.id = uuidv4();
    this.title = title;
    this.completed = false;
  }
}
