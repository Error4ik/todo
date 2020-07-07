import {CommonDAO} from './CommonDAO';
import {Task} from '../../../domain/Task';
import {Observable} from 'rxjs';
import {SearchParams} from '../search/SearchParams';

export interface TaskDAO extends CommonDAO<Task> {
  findTasks(searchParams: SearchParams): Observable<any>;
}
