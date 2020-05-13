import {TaskDAO} from '../interface/TaskDAO';
import {Category} from '../../../interfaces/category';
import {Priority} from '../../../interfaces/priority';
import {Task} from '../../../interfaces/task';
import {Observable, of} from 'rxjs';
import {TestData} from '../../testData';

export class TaskDaoArray implements TaskDAO {
  add(item: Task): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(todo => todo.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return undefined;
  }

  update(item: Task): Observable<Task> {
    return undefined;
  }
}
