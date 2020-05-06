import { Injectable } from '@angular/core';
import {Category} from '../interfaces/category';
import {TestData} from '../data/testData';
import {Task} from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  public getCategories(): Category[] {
    return TestData.categories;
  }

  getTasks(): Task[] {
    return TestData.tasks;
  }
}
