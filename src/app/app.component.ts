import {Component, OnInit} from '@angular/core';
import {Task} from './interfaces/task';
import {DataHandlerService} from './services/data-handler.service';
import {Category} from './interfaces/category';
import {Priority} from './interfaces/priority';

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

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.updatePriorities();
    this.updateCategories();
    this.onSelectCategory(null);
  }

  private onAddTask(task: Task): void {
    this.dataHandlerService.addTask(task).subscribe(() => {
      this.updateTasks();
    });
  }

  private onUpdateTask(task: Task): void {
    this.dataHandlerService.updateTask(task).subscribe(() => {
      this.updateTasks();
    });
  }

  private onDeleteTask(task: Task): void {
    this.dataHandlerService.deleteTask(task.id).subscribe(() => {
      this.updateTasks();
    });
  }

  private onSearchTaskByTitle(title: string): void {
    this.searchTaskByTitle = title;
    this.updateTasks();
  }

  private onFilterTasksByStatus(status: boolean): void {
    this.filterByStatus = status;
    this.updateTasks();
  }

  private onFilterTasksByPriority(priority: Priority): void {
    this.filterPriority = priority;
    this.updateTasks();
  }

  private onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.updateTasks();
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

  private updateTasks(): void {
    this.dataHandlerService.searchTasks(this.selectedCategory, this.searchTaskByTitle, this.filterByStatus, this.filterPriority)
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  private updateCategories(): void {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  private updatePriorities(): void {
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }
}
