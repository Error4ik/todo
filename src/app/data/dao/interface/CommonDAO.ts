import {Observable} from 'rxjs';

export interface CommonDAO<T> {
  add(item: T): Observable<T>;

  get(id: string): Observable<T>;

  delete(id: string): Observable<T>;

  update(item: T): Observable<T>;

  getAll(): Observable<T[]>;
}
