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

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandlerService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
  }
}
