import {CommonDAO} from './CommonDAO';
import {Task} from '../../../interfaces/task';
import {Category} from '../../../interfaces/category';
import {Priority} from '../../../interfaces/priority';
import {Observable} from 'rxjs';

export interface TaskDAO extends CommonDAO<Task> {
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  getCompletedCountInCategory(category: Category): Observable<number>;

  getUncompletedCountInCategory(category: Category): Observable<number>;

  getTotalCountInCategory(category: Category): Observable<number>;

  getTotalCount(): Observable<number>;
}
