import {Inject, Injectable, InjectionToken} from '@angular/core';
import {StatDAO} from '../interface/StatDAO';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stat} from '../../../domain/Stat';

export const STAT_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class StatService implements StatDAO {

  constructor(@Inject(STAT_URL_TOKEN) private baseUrl, private httpClient: HttpClient) {
  }

  getStats(): Observable<Stat[]> {
    return this.httpClient.get<Stat[]>(this.baseUrl + '/stats');
  }
}
