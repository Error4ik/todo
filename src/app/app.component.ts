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
  title = 'todo';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];

  private selectedCategory: Category = null;
  private filterByTitle: string;
  private filterByStatus: boolean;
  private filterPriority: Priority;
  private filterCategoryByName: string;

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.updateTasks();
    this.updateCategories();
    this.updatePriorities();
  }

  private onAddTask(task: Task): void {
    this.dataHandlerService.addTask(task).subscribe(() => {
      this.updateTasks();
    });
  }

  private onUpdateTask(task: Task): void {
    this.dataHandlerService.updateTask(task)
      .subscribe(() => {
        this.updateTasks();
      });
  }

  private onDeleteTask(task: Task): void {
    this.dataHandlerService.deleteTask(task.id).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  private onFilterByTaskTitle(title: string): void {
    this.filterByTitle = title;
    this.updateTasks();
  }

  private onFilterByTaskStatus(status: boolean): void {
    this.filterByStatus = status;
    this.updateTasks();
  }

  private onFilterByTaskPriority(priority: Priority): void {
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
      if (this.selectedCategory === result) {
        this.onSelectCategory(null);
      }
      this.updateCategories();
    });
  }

  private onUpdateCategory(category: Category): void {
    this.dataHandlerService.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
      this.updateCategories();
    });
  }

  private onFilteredByCategoryName(categoryName: string): void {
    this.filterCategoryByName = categoryName;
    this.dataHandlerService.searchCategoriesByName(categoryName).subscribe(categories => this.categories = categories);
  }

  private updateTasks(): void {
    this.dataHandlerService.searchTasks(this.selectedCategory, this.filterByTitle, this.filterByStatus, this.filterPriority)
      .subscribe(tasks => this.tasks = tasks);
  }

  private updateCategories() {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  private updatePriorities() {
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }
}
