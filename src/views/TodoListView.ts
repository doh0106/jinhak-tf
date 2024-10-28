import { ITodo } from '../interfaces/ITodo';
import { ITodoView } from '../interfaces/ITodoView';

// SRP: ✅ 콘솔에 Todo 리스트를 표시하는 단일 책임을 가짐
// OCP: ✅ ITodoView 인터페이스를 구현하여, 다른 코드 수정 없이 새로운 뷰로 교체 가능
export interface ViewConfig {
  headerFormat: string;
  itemFormat: string;
  footerFormat: string;
}

export class ConsoleToDoListView implements ITodoView {
  constructor(private config: ViewConfig) {}

  displayTodos(todos: ITodo[]): void {
    console.log(this.config.headerFormat);
    todos.forEach(todo => {
      const status = todo.completed ? 'X' : ' ';
      console.log(this.config.itemFormat.replace('{status}', status)
        .replace('{title}', todo.title)
        .replace('{id}', todo.id));
    });
    console.log(this.config.footerFormat);
  }
}
