import {Inject, Injectable, InjectionToken} from '@angular/core';
import {TaskDAO} from '../interface/TaskDAO';
import {Task} from '../../../domain/Task';
import {Observable} from 'rxjs';
import {SearchParams} from '../search/SearchParams';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './common.service';

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class TaskService extends CommonService<Task> implements TaskDAO {

  constructor(@Inject(TASK_URL_TOKEN) private baseUrl, private http: HttpClient) {
    super(baseUrl, http);
  }

  findTasks(searchParams: SearchParams): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/search', searchParams);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }
}
