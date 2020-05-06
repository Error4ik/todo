import { Injectable } from '@angular/core';
import {Category} from '../interfaces/category';
import {TestData} from '../data/testData';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  public getCategories(): Category[] {
    return TestData.categories;
  }
}
