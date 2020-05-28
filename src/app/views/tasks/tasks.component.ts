import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from '../../interfaces/task';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../interfaces/category';
import {Priority} from '../../interfaces/priority';
import {OperationType} from '../../dialog/OperationType';

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
  private addTask = new EventEmitter<Task>();
  @Output()
  private selectCategory = new EventEmitter<Category>();
  @Output()
  private filterByTitle = new EventEmitter<string>();
  @Output()
  private filterByStatus = new EventEmitter<boolean>();
  @Output()
  private filterPriority = new EventEmitter<Priority>();

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

  @Input()
  private selectedCategory: Category;

  constructor(private dialog: MatDialog) {
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
      {data: [task, 'Edit task', OperationType.EDIT], maxWidth: '600px', autoFocus: false});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'complete') {
        task.completed = !task.completed;
        this.updateTask.emit(task);
      }
      if (result === 'activate') {
        task.completed = !task.completed;
        this.updateTask.emit(task);
      }
      if (result === 'delete') {
        this.deleteTask.emit(task);
      }
      if (result as Task) {
        this.updateTask.emit(task);
      }
      this.addTableItems();
    });
  }

  private onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  private openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm the action',
        message: `Are you sure that you want to delete an task? ${task.title}`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
      this.addTableItems();
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

  private onFilterByStatus(status: boolean) {
    if (status !== this.selectedStatusFilter) {
      this.addTableItems();
      this.selectedStatusFilter = status;
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

  private openAddTaskDialog() {
    const task = new Task(null, '', false, null, this.selectedCategory);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'The creation of the task', OperationType.ADD], maxWidth: '600px', autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addTask.emit(task);
      this.addTableItems();
    });
  }
}
