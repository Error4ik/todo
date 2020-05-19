import {Injectable} from '@angular/core';
import {TaskDaoArray} from '../data/dao/impl/TaskDaoArray';
import {CategoryDaoArray} from '../data/dao/impl/CategoryDaoArray';
import {Category} from '../interfaces/category';
import {Priority} from '../interfaces/priority';
import {Observable} from 'rxjs';
import {Task} from '../interfaces/task';
import {PriorityDaoArray} from '../data/dao/impl/PriorityDaoArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor(private taskDaoArray: TaskDaoArray, private categoryDaoArray: CategoryDaoArray, private priorityDaoArray: PriorityDaoArray) {
  }

  getAllTasks() {
    return this.taskDaoArray.getAll();
  }

  getAllCategories() {
    return this.categoryDaoArray.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  getAllPriorities() {
    return this.priorityDaoArray.getAll();
  }
}
