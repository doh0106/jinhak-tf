import { TodoList } from './services/TodoList';
import { ConsoleToDoListView } from './views/TodoListView';
import { InMemoryTodoRepository } from './repositories/InMemoryTodoRepository';
import { ITodoRepository } from './interfaces/ITodoRepository';
import { ITodoView } from './interfaces/ITodoView';
import { TodoStateManager } from './services/TodoStateManager';
import { TodoFormatter } from './formatters/TodoFormatter';
import { ViewConfigFactory } from './config/ViewConfigFactory';

// SRP: ✅ 애플리케이션의 초기화와 실행 흐름 관리라는 단일 책임을 가짐
// OCP: ✅ 의존성 주입을 통해 다양한 구현체(저장소, 뷰)를 유연하게 교체 가능
class TodoApp {
  private todoList: TodoList;
  private todoView: ITodoView;  // ✅ 인터페이스에 의존

  constructor(todoList: TodoList, view: ITodoView) {  // ✅ TodoList 타입으로 변경
    this.todoList = todoList;
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
const viewConfig = ViewConfigFactory.createDefaultConfig();
const formatter = new TodoFormatter();
const repository = new InMemoryTodoRepository();
const stateManager = new TodoStateManager();
const view = new ConsoleToDoListView(viewConfig, formatter);
const todoList = new TodoList(repository, stateManager);  // ✅ stateManager 전달
const app = new TodoApp(todoList, view);  // ✅ TodoList 타입으로 전달
app.run().catch(console.error);
