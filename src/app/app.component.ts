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

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.onSelectCategory(null);
  }

  private onSelectCategory(category: Category) {
    this.selectedCategory = category;
    this.updateTasks();
  }

  private onAddTask(task: Task) {
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

  private onDeleteTask(task: Task) {
    this.dataHandlerService.deleteTask(task.id).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  onAddCategory(category: Category) {
    this.dataHandlerService.createCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  private onDeleteCategory(category: Category) {
    this.dataHandlerService.deleteCategory(category.id).subscribe(() => {
      this.selectedCategory = null;
      this.onSelectCategory(this.selectedCategory);
    });
  }

  private onUpdateCategory(category: Category) {
    this.dataHandlerService.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  private onFilterByTaskTitle(title: string) {
    this.filterByTitle = title;
    this.updateTasks();
  }

  private onFilterByTaskStatus(status: boolean) {
    this.filterByStatus = status;
    this.updateTasks();
  }

  onFilterByTaskPriority(priority: Priority) {
    this.filterPriority = priority;
    this.updateTasks();
  }

  private updateTasks(): void {
    this.dataHandlerService.searchTasks(this.selectedCategory, this.filterByTitle, this.filterByStatus, this.filterPriority)
      .subscribe(tasks => this.tasks = tasks);
  }
}
