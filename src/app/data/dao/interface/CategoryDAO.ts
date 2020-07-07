import {CommonDAO} from './CommonDAO';
import {Category} from '../../../domain/Category';
import {Observable} from 'rxjs';

export interface CategoryDAO extends CommonDAO<Category> {
  findCategories(title: string): Observable<Category[]>;
}
