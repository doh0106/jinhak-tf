import { ITodo } from '../interfaces/ITodo';
import { Todo } from '../models/Todo';

export class TodoFactory {
  static createTodo(title: string): ITodo {
    return new Todo(title);
  }
}
