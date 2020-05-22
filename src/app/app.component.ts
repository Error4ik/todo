import {Component, OnInit} from '@angular/core';
import {Task} from './interfaces/task';
import {DataHandlerService} from './services/data-handler.service';
import {Category} from './interfaces/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo';
  tasks: Task[];
  categories: Category[];

  private selectedCategory: Category = null;

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(this.selectedCategory);
  }

  private onSelectCategory(category: Category) {
    this.selectedCategory = category;

    this.dataHandlerService.searchTasks(this.selectedCategory, null, null, null)
      .subscribe(tasks => this.tasks = tasks);
  }

  private onUpdateTask(task: Task): void {
    this.dataHandlerService.updateTask(task)
      .subscribe(() => {
        this.dataHandlerService.searchTasks(this.selectedCategory, null, null, null)
          .subscribe(tasks => this.tasks = tasks);
      });
  }

  private onDeleteTask(task: Task) {
    this.dataHandlerService.deleteTask(task.id).subscribe(() => {
      this.dataHandlerService.searchTasks(this.selectedCategory, null, null, null)
        .subscribe(tasks => this.tasks = tasks);
    });
  }
}
