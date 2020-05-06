import {Priority} from './priority';
import {Category} from './category';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority?: Priority;
  category?: Category;
  date?: Date;
}
