import { Injectable } from '@angular/core';
import {Category} from '../interfaces/category';
import {TestData} from '../data/testData';
import {Task} from '../interfaces/task';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() {
    this.fillTasks();
  }

  fillTasks() {
    this.tasksSubject.next(TestData.tasks);
  }

  fillTasksByCategory(category: Category) {
    this.tasksSubject.next(TestData.tasks.filter(task => task.category === category));
  }
}
