import { TodoList } from './services/TodoList';
import { TodoListView } from './views/TodoListView';

class TodoApp {
  private todoList: TodoList;
  private todoListView: TodoListView;

  constructor() {
    this.todoList = new TodoList();
    this.todoListView = new TodoListView();
  }

  async run(): Promise<void> {
    // 예시 사용법
    const todo1 = await this.todoList.addTodo('우유 사기');
    const todo2 = await this.todoList.addTodo('코딩 공부하기');
    
    const todos = await this.todoList.getTodos();
    this.todoListView.displayTodos(todos);
    
    await this.todoList.toggleTodo(todo1.id);
    const updatedTodos = await this.todoList.getTodos();
    this.todoListView.displayTodos(updatedTodos);
    
    await this.todoList.removeTodo(todo2.id);
    const finalTodos = await this.todoList.getTodos();
    this.todoListView.displayTodos(finalTodos);
  }
}

const app = new TodoApp();
app.run().catch(console.error);
