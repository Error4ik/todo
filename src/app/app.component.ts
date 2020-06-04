import {Component, OnInit} from '@angular/core';
import {Task} from './interfaces/task';
import {DataHandlerService} from './services/data-handler.service';
import {Category} from './interfaces/category';
import {Priority} from './interfaces/priority';
import {zip} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'todo';
  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[];

  private selectedCategory: Category = null;

  private searchTaskByTitle = '';
  private searchCategoryByTitle = '';

  private filterByStatus: boolean;
  private filterPriority: Priority;

  private totalTasksCountInCategory: number;
  private completedTasksCountInCategory: number;
  private uncompletedTasksCountInCategory: number;
  private uncompletedTotalTasksCount: number;

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.updatePriorities();
    this.updateCategories();
    this.onSelectCategory(null);
  }

  private onAddTask(task: Task): void {
    this.dataHandlerService.addTask(task).subscribe(() => {
      this.updateTasksAndStatistics();
    });
  }

  private onUpdateTask(task: Task): void {
    this.dataHandlerService.updateTask(task).subscribe(() => {
      this.updateTasksAndStatistics();
    });
  }

  private onDeleteTask(task: Task): void {
    this.dataHandlerService.deleteTask(task.id).subscribe(() => {
      this.updateTasksAndStatistics();
    });
  }

  private onSearchTaskByTitle(title: string): void {
    this.searchTaskByTitle = title;
    this.updateTasksAndStatistics();
  }

  private onFilterTasksByStatus(status: boolean): void {
    this.filterByStatus = status;
    this.updateTasksAndStatistics();
  }

  private onFilterTasksByPriority(priority: Priority): void {
    this.filterPriority = priority;
    this.updateTasksAndStatistics();
  }

  private onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.updateTasksAndStatistics();
  }

  private onAddCategory(category: Category): void {
    this.dataHandlerService.createCategory(category).subscribe(() => {
      this.updateCategories();
    });
  }

  private onDeleteCategory(category: Category): void {
    this.dataHandlerService.deleteCategory(category.id).subscribe((result) => {
      if (result === this.selectedCategory) {
        this.selectedCategory = null;
      }
      this.onSelectCategory(this.selectedCategory);
      this.updateCategories();
    });
  }

  private onUpdateCategory(category: Category): void {
    this.dataHandlerService.updateCategory(category).subscribe(() => {
      this.onSearchCategoryByTitle(this.searchCategoryByTitle);
    });
  }

  private onSearchCategoryByTitle(categoryName: string): void {
    this.searchCategoryByTitle = categoryName;
    this.dataHandlerService.searchCategoriesByName(categoryName).subscribe(categories => this.categories = categories);
  }

  private updateTasksAndStatistics(): void {
    this.dataHandlerService.searchTasks(this.selectedCategory, this.searchTaskByTitle, this.filterByStatus, this.filterPriority)
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    this.updateStatistics();
  }

  private updateCategories(): void {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  private updatePriorities(): void {
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  private updateStatistics() {
    zip(
      this.dataHandlerService.getTotalTasksCountInCategory(this.selectedCategory),
      this.dataHandlerService.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandlerService.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandlerService.getUncompletedTotalCount()
    ).subscribe(array => {
      this.totalTasksCountInCategory = array[0];
      this.completedTasksCountInCategory = array[1];
      this.uncompletedTasksCountInCategory = array[2];
      this.uncompletedTotalTasksCount = array[3];
    });
  }
}
