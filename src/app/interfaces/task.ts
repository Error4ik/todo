import {Priority} from './priority';
import {Category} from './category';

export class Task {
  constructor(id: number, title: string, completed: boolean, priority: Priority, category: Category) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.priority = priority;
    this.category = category;
  }

  id: number;
  title: string;
  completed: boolean;
  priority?: Priority;
  category?: Category;
  date?: Date;
}
