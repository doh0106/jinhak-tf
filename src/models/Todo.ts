import { v4 as uuidv4 } from 'uuid';
import { ITodo } from '../interfaces/ITodo';

export class Todo implements ITodo {
  id: string;
  title: string;
  completed: boolean;

  constructor(title: string) {
    this.id = uuidv4();
    this.title = title;
    this.completed = false;
  }
}