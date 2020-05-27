import {TaskDAO} from '../interface/TaskDAO';
import {Category} from '../../../interfaces/category';
import {Priority} from '../../../interfaces/priority';
import {Task} from '../../../interfaces/task';
import {Observable, of} from 'rxjs';
import {TestData} from '../../testData';
import apply = Reflect.apply;

export class TaskDaoArray implements TaskDAO {
  add(task: Task): Observable<Task> {
    task.id = this.getLastIdTask();
    TestData.tasks.push(task);
    return of(task);
  }

  delete(id: number): Observable<Task> {
    const tmpTask = TestData.tasks.find(t => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(tmpTask), 1);
    return of(tmpTask);
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(todo => todo.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  update(task: Task): Observable<Task> {
    const tmpTask = TestData.tasks.find(t => t.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(tmpTask), 1, task);
    return of(task);
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks: Task[] = TestData.tasks;
    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }
    if (searchText != null) {
      allTasks = allTasks.filter(task => task.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }
    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }
    return allTasks;
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
  }
}
