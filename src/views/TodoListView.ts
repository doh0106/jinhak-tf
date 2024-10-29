import { ITodo } from '../interfaces/ITodo';
import { ITodoView } from '../interfaces/ITodoView';
import { ITodoFormatter } from '../interfaces/ITodoFormatter';
import { IViewConfig } from '../interfaces/IViewConfig';

// SRP: ✅ 콘솔에 Todo 리스트를 표시하는 단일 책임을 가짐
// OCP: ✅ ITodoView 인터페이스를 구현하여, 다른 코드 수정 없이 새로운 뷰로 교체 가능
export interface ViewConfig {
  headerFormat: string;
  itemFormat: string;
  footerFormat: string;
}

export class ConsoleToDoListView implements ITodoView {
  constructor(
    private config: IViewConfig,
    private formatter: ITodoFormatter
  ) {}

  displayTodos(todos: ITodo[]): void {
    console.log(this.config.headerFormat);
    todos.forEach(todo => {
      console.log(this.formatter.format(todo, this.config.itemFormat));
    });
    console.log(this.config.footerFormat);
  }
}
