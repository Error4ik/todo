import {Inject, Injectable, InjectionToken} from '@angular/core';
import {TaskDAO} from '../interface/TaskDAO';
import {Task} from '../../../domain/Task';
import {Observable} from 'rxjs';
import {SearchParams} from '../search/SearchParams';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommonService} from './common.service';
import {RequestTask} from '../search/RequestTask';

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class TaskService extends CommonService<Task> implements TaskDAO {

  constructor(@Inject(TASK_URL_TOKEN) private baseUrl, private http: HttpClient) {
    super(baseUrl, http);
  }

  findTasks(searchParams: SearchParams): Observable<any> {
    let param = new HttpParams();

    param = param.append('title', searchParams.title);
    param = param.append('completed', String(searchParams.completed));
    param = param.append('priority', searchParams.priority);
    param = param.append('category', searchParams.category);
    param = param.append('pageNumber', searchParams.pageNumber.toString());
    param = param.append('pageLimit', searchParams.pageLimit.toString());
    param = param.append('sortColumn', searchParams.sortColumn);
    param = param.append('sortDirection', searchParams.sortDirection);

    return this.http.get<Task>(this.baseUrl + '/search', {params: param});
  }

  update(id: string, task: Task): Observable<Task> {
    const requestTask = this.getRequestTask(task);
    return this.http.put<Task>(this.baseUrl + '/' + id, requestTask);
  }

  add(task: Task): Observable<Task> {
    const requestTask = this.getRequestTask(task);
    return this.http.post<Task>(this.baseUrl + '/', requestTask);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/');
  }

  private getRequestTask(task: Task) {
    return new RequestTask(task.title, task.completed, task.priority.id.toString(), task.category.id.toString(), task.date);
  }
}
