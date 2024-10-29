import { ITodo } from "../interfaces/ITodo";
import { ITodoStateManager } from "../interfaces/ITodoStateManager";

export class TodoStateManager implements ITodoStateManager {
  toggleState(todo: ITodo): void {
    todo.completed = !todo.completed;
  }
}
