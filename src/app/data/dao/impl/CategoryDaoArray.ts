import {CategoryDAO} from '../interface/CategoryDAO';
import {Category} from '../../../interfaces/category';
import {Observable, of} from 'rxjs';
import {TestData} from '../../testData';

export class CategoryDaoArray implements CategoryDAO {
  add(item: Category): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(item: Category): Observable<Category> {
    return undefined;
  }
}
