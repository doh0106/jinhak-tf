import { ITodo } from "../interfaces/ITodo";
export interface ITodoFormatter {
  format(todo: ITodo, template: string): string;
}

export class TodoFormatter implements ITodoFormatter {
  format(todo: ITodo, template: string): string {
    const status = todo.completed ? 'X' : ' ';
    return template
      .replace('{status}', status)
      .replace('{title}', todo.title)
      .replace('{id}', todo.id);
  }
}
