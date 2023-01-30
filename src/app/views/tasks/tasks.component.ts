import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../domain/Task';
import {MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../domain/Category';
import {Priority} from '../../domain/Priority';
import {DialogAction} from '../../dialog/DialogResult';
import {DeviceDetectorService} from 'ngx-device-detector';
import {SearchParams} from '../../data/dao/search/SearchParams';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[];
  private dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();
  private searchParams: SearchParams;

  private filterTitle: string;
  private filterCompleted: string;
  private filterPriority: string;
  private filterSortColumn: string;

  @Input('tasks')
  private set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('categories')
  private set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('priorities')
  private set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input('searchParams')
  private set setSearchParams(searchParams: SearchParams) {
    this.searchParams = searchParams;
    this.initSearchValues();
  }

  @Input()
  private selectedCategory: Category;
  @Input()
  private totalTasksFounded: number;
  @Input()
  private showSearch: boolean;

  @Output()
  private addTask = new EventEmitter<Task>();
  @Output()
  private updateTask = new EventEmitter<Task>();
  @Output()
  private deleteTask = new EventEmitter<Task>();
  @Output()
  private selectCategory = new EventEmitter<Category>();
  @Output()
  private paging = new EventEmitter<PageEvent>();
  @Output()
  private searchAction = new EventEmitter<SearchParams>();
  @Output()
  private toggleSearch = new EventEmitter<boolean>();

  private isMobile: boolean;
  private sortIconName: string;

  readonly defaultSortColumn = 'title';
  readonly defaultSortDirection = 'asc';
  readonly colorCompletedTask = '#ebeced';
  readonly colorWhite = '#fff';

  constructor(private dialog: MatDialog, private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
  }

  private getPriorityColor(task: Task): string {
    if (task.completed) {
      return this.colorCompletedTask;
    }
    return task.priority ? task.priority.color : this.colorWhite;
  }

  private fillTable(): void {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks;
  }

  private openAddTaskDialog() {
    const task = new Task(null, '', 0, null, this.selectedCategory);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'The creation of the task', this.categories, this.priorities], maxWidth: '600px', autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.addTask.emit(task);
      }
    });
  }

  private editTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Edit task', this.categories, this.priorities], maxWidth: '600px', autoFocus: false});
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result.action === DialogAction.COMPLETE) {
        task.completed = 1;
        this.updateTask.emit(task);
        return;
      }
      if (result.action === DialogAction.ACTIVATE) {
        task.completed = 0;
        this.updateTask.emit(task);
        return;
      }
      if (result.action === DialogAction.DELETE) {
        this.deleteTask.emit(task);
        return;
      }
      if (result.action === DialogAction.SAVE) {
        this.updateTask.emit(result.object);
        return;
      }
    });
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
      if (!result) {
        return;
      }
      if (result.action === DialogAction.OK) {
        this.deleteTask.emit(task);
      }
    });
  }

  private onToggleStatus(task: Task) {
    task.completed = task.completed === 0 ? 1 : 0;
    this.updateTask.emit(task);
  }

  private onSelectCategory(category: Category) {
    this.selectCategory.emit(category);
  }

  private pageChanged(pageEvent: PageEvent) {
    this.paging.emit(pageEvent);
  }

  private initSearch() {
    this.searchParams.title = this.filterTitle;
    this.searchParams.completed = this.filterCompleted;
    this.searchParams.priority = this.filterPriority;
    this.searchParams.sortColumn = this.filterSortColumn;

    this.searchAction.emit(this.searchParams);
  }

  private initSearchValues() {
    if (!this.searchParams) {
      return;
    }
    this.filterTitle = this.searchParams.title;
    this.filterCompleted = this.searchParams.completed;
    this.filterPriority = this.searchParams.priority;
    this.filterSortColumn = this.searchParams.sortColumn;
  }

  private clearSearchValues() {
    this.filterTitle = '';
    this.filterCompleted = '';
    this.filterPriority = '';
    this.filterSortColumn = this.defaultSortColumn;
  }

  private onToggleSearch() {
    this.toggleSearch.emit(!this.showSearch);
  }
}
