import {PriorityDAO} from '../interface/PriorityDAO';
import {Priority} from '../../../interfaces/priority';
import {Observable, of} from 'rxjs';
import {TestData} from '../../testData';

export class PriorityDaoArray implements PriorityDAO {
  add(priority: Priority): Observable<Priority> {
    priority.id = this.getLastPriorityId();
    TestData.priorities.push(priority);
    return of(priority);
  }

  delete(id: number): Observable<Priority> {
    TestData.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        task.priority = null;
      }
    });

    const tmpPriority = TestData.priorities.find(p => p.id === id);
    TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);
    return of(tmpPriority);
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(priority: Priority): Observable<Priority> {
    const tmpPriority = TestData.priorities.find(p => p.id === priority.id);
    TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1, priority);
    return of(tmpPriority);
  }

  private getLastPriorityId() {
    return Math.max.apply(Math, TestData.priorities.map(priority => priority.id)) + 1;
  }
}
