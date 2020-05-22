import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Task} from 'src/app/interfaces/task';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../interfaces/category';
import {Priority} from '../../interfaces/priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  private dialogTitle: string;
  private task: Task;
  private tmpTitle: string;
  private categories: Category[];
  private tmpCategory: Category;
  protected priorities: Priority[];
  private tmpPriority: Priority;
  private tmpDate: Date;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.data[0].date;
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;
    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm the action.',
        message: `Are you sure that you want to delete an task? ${this.task.title}`,
        autoFocus: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  private activateTask() {
    this.dialogRef.close('complete');
  }

  private completeTask() {
    this.dialogRef.close('activate');
  }
}
