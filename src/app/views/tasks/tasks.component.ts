import { Component, OnInit } from '@angular/core';
import {Task} from '../../interfaces/task';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit() {
    this.tasks = this.dataHandlerService.getTasks();
  }

}
