import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../interfaces/task';
import {DataHandlerService} from '../../services/data-handler.service';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../interfaces/category';
import {Priority} from '../../interfaces/priority';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  private tasks: Task[];
  private dataSource: MatTableDataSource<Task>;
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  private searchTaskText: string;
  private selectedStatusFilter: boolean;
  private selectedPriorityFilter: Priority = null;
  private priorities: Priority[];

  @Output()
  private updateTask = new EventEmitter<Task>();
  @Output()
  private deleteTask = new EventEmitter<Task>();
  @Output()
  private selectCategory = new EventEmitter<Category>();
  @Output()
  private filterByTitle = new EventEmitter();
  @Output()
  private filterByStatus = new EventEmitter();
  @Output()
  private filterPriority = new EventEmitter();

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('priorities')
  private set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  constructor(private dataHandlerService: DataHandlerService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Task>();
    this.fillTable();
  }

  ngAfterViewInit(): void {
    this.addTableItems();
  }

  private getPriorityColor(task: Task): string {
    if (task.completed) {
      return 'rgb(226,224,224)';
    }
    return task.priority ? task.priority.color : '#fff';
  }

  private fillTable(): string {
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

  private addTableItems(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private editTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent,
      {data: [task, 'Edit task'], maxWidth: '600px', autoFocus: false});
    dialogRef.afterClosed().subscribe(result => {
      this.addTableItems();
      if (result === 'complete') {
        task.completed = !task.completed;
        this.updateTask.emit(task);
        return;
      }
      if (result === 'activate') {
        task.completed = !task.completed;
        this.updateTask.emit(task);
        return;
      }
      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }
      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  private onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  private openDeletedDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Confirm the action', message: `Are you sure that you want to delete an task? ${task.title}`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteTask.emit(task);
      return;
    });
  }

  private onSelectCategory(category: Category) {
    this.selectCategory.emit(category);
    this.addTableItems();
  }

  private onFilterByTitle() {
    this.addTableItems();
    this.filterByTitle.emit(this.searchTaskText);
  }

  private onFilterByStatus(value: boolean) {
    if (value !== this.selectedStatusFilter) {
      this.addTableItems();
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  private onFilterByPriority(priority: Priority) {
    if (this.selectedPriorityFilter !== priority) {
      this.addTableItems();
      this.selectedPriorityFilter = priority;
      this.filterPriority.emit(this.selectedPriorityFilter);
    }
  }
}
