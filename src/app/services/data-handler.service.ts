import {Injectable} from '@angular/core';
import {TaskDaoArray} from '../data/dao/impl/TaskDaoArray';
import {CategoryDaoArray} from '../data/dao/impl/CategoryDaoArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor(private taskDaoArray: TaskDaoArray, private categoryDaoArray: CategoryDaoArray) {
  }

  getAllTasks() {
    return this.taskDaoArray.getAll();
  }

  getAllCategories() {
    return this.categoryDaoArray.getAll();
  }
}
