import {Stat} from '../../../domain/Stat';
import {Observable} from 'rxjs';

export interface StatDAO {
  getStats(): Observable<Stat[]>;
}
