import { TodoList } from './services/TodoList';
import { TodoListView } from './views/TodoListView';

class TodoApp {
  private todoList: TodoList;
  private todoListView: TodoListView;

  constructor() {
    this.todoList = new TodoList();
    this.todoListView = new TodoListView();
  }

  run(): void {
    // 예시 사용법
    const todo1 = this.todoList.addTodo('우유 사기');
    const todo2 = this.todoList.addTodo('코딩 공부하기');
    
    this.todoListView.displayTodos(this.todoList.getTodos());
    
    this.todoList.toggleTodo(todo1.id);
    this.todoListView.displayTodos(this.todoList.getTodos());
    
    this.todoList.removeTodo(todo2.id);
    this.todoListView.displayTodos(this.todoList.getTodos());
  }
}

const app = new TodoApp();
app.run();
