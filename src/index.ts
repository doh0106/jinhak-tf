import { TodoList } from './services/TodoList';
import { ConsoleToDoListView, ViewConfig } from './views/TodoListView';
import { InMemoryTodoRepository } from './repositories/InMemoryTodoRepository';
import { ITodoRepository } from './interfaces/ITodoRepository';
import { ITodoView } from './interfaces/ITodoView';

// SRP: ✅ 애플리케이션의 초기화와 실행 흐름 관리라는 단일 책임을 가짐
// OCP: ✅ 의존성 주입을 통해 다양한 구현체(저장소, 뷰)를 유연하게 교체 가능
class TodoApp {
  private todoList: TodoList;
  private todoView: ITodoView;  // ✅ 인터페이스에 의존

  constructor(repository: ITodoRepository, view: ITodoView) {  // ✅ 의존성 주입
    this.todoList = new TodoList(repository);
    this.todoView = view;
  }

  async run(): Promise<void> {
    const todo1 = await this.todoList.addTodo('우유 사기');
    const todo2 = await this.todoList.addTodo('코딩 공부하기');
    
    this.todoView.displayTodos(await this.todoList.getTodos());
    
    await this.todoList.toggleTodo(todo1.id);
    this.todoView.displayTodos(await this.todoList.getTodos());
    
    await this.todoList.removeTodo(todo2.id);
    this.todoView.displayTodos(await this.todoList.getTodos());
  }
}

// 뷰 설정 추가
const viewConfig: ViewConfig = {
  headerFormat: '\n=== Todo List ===',
  itemFormat: '[{status}] {title} (ID: {id})',
  footerFormat: '================\n'
};

// 애플리케이션 구성
const repository = new InMemoryTodoRepository();
const view = new ConsoleToDoListView(viewConfig);  // ✅ config 전달
const app = new TodoApp(repository, view);
app.run().catch(console.error);
