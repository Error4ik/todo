import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../interfaces/task';
import {DataHandlerService} from '../../services/data-handler.service';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  private tasks: Task[];
  private dataSource: MatTableDataSource<Task>;
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Task>();
    this.fillTable();
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

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  private fillTable() {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks;
    this.addTableItems();

    // @ts-ignore
    this.dataSource.sortingDataAccessor = (task, colName) => {
      if (colName === 'date') {
        return task.date ? task.date : null;
      } else if (colName === 'priority') {
        return task.priority ? task.priority.id : null;
      } else {
        return task.title;
      }
    };
  }

  private addTableItems() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onClickTask(task: Task) {
    this.updateTask.emit(task);
  }
}
