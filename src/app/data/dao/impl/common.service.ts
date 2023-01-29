import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService<T> {

  private readonly url: string;

  constructor(url: string, private httpClient: HttpClient) {
    this.url = url;
  }

  add(item: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/', item);
  }

  delete(id: string): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/' + id);
  }

  get(id: string): Observable<T> {
    return this.httpClient.get<T>(this.url + '/' + id);
  }

  update(id: string, value: T): Observable<T> {
    return this.httpClient.put<T>(this.url + '/' + id, value);
  }
}
