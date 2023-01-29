import {Inject, Injectable, InjectionToken} from '@angular/core';
import {TaskDAO} from '../interface/TaskDAO';
import {Task} from '../../../domain/Task';
import {Observable} from 'rxjs';
import {SearchParams} from '../search/SearchParams';
import {HttpClient} from '@angular/common/http';
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
    return this.getAll();
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
