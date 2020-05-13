import {PriorityDAO} from '../interface/PriorityDAO';
import {Priority} from '../../../interfaces/priority';
import {Observable} from 'rxjs';

export class PriorityDaoArray implements PriorityDAO {
  add(item: Priority): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return undefined;
  }

  update(item: Priority): Observable<Priority> {
    return undefined;
  }
}
