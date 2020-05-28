import {Injectable} from '@angular/core';
import {TaskDaoArray} from '../data/dao/impl/TaskDaoArray';
import {CategoryDaoArray} from '../data/dao/impl/CategoryDaoArray';
import {Category} from '../interfaces/category';
import {Priority} from '../interfaces/priority';
import {Observable, of} from 'rxjs';
import {Task} from '../interfaces/task';
import {PriorityDaoArray} from '../data/dao/impl/PriorityDaoArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor(private taskDaoArray: TaskDaoArray, private categoryDaoArray: CategoryDaoArray, private priorityDaoArray: PriorityDaoArray) {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id);
  }

  createCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.add(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArray.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  searchCategoriesByName(categoryName: string): Observable<Category[]> {
    return this.categoryDaoArray.categoriesByName(categoryName);
  }
}
