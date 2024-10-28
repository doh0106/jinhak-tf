import { ITodo } from '../interfaces/ITodo';

export class TodoListView {
  displayTodos(todos: ITodo[]): void {
    console.log('\n=== Todo List ===');
    todos.forEach(todo => {
      console.log(`[${todo.completed ? 'X' : ' '}] ${todo.title} (ID: ${todo.id})`);
    });
    console.log('================\n');
  }
}