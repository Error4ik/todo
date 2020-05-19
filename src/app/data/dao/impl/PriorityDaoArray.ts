import {PriorityDAO} from '../interface/PriorityDAO';
import {Priority} from '../../../interfaces/priority';
import {Observable, of} from 'rxjs';
import {TestData} from '../../testData';

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
    return of(TestData.priorities);
  }

  update(item: Priority): Observable<Priority> {
    return undefined;
  }
}
