import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    let param = new HttpParams();
    param = param.append('title', title);
    return this.http.get<Category[]>(this.baseUrl + `/find-by-title`, {params: param});
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/');
  }
}
