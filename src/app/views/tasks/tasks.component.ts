import {Component, OnInit} from '@angular/core';
import {Task} from '../../interfaces/task';
import {DataHandlerService} from '../../services/data-handler.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  private dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandlerService.tasksSubject.subscribe(tasks => this.tasks = tasks);
    this.refreshTable();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task): string {
    if (task.completed) {
      return 'rgb(226,224,224)';
    }
    return task.priority ? task.priority.color : '#fff';
  }

  private refreshTable() {
    this.dataSource.data = this.tasks;
  }
}
