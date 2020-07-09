import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryDAO} from '../interface/CategoryDAO';
import {Category} from '../../../domain/Category';
import {Observable} from 'rxjs';
import {CommonService} from './common.service';

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CommonService<Category> implements CategoryDAO {

  constructor(@Inject(CATEGORY_URL_TOKEN) private baseUrl, private http: HttpClient) {
    super(baseUrl, http);
  }

  findCategories(title: string): Observable<Category[]> {
    return this.http.post<Category[]>(this.baseUrl + '/find-by-title', title);
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/categories');
  }
}
