import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Task} from 'src/app/domain/Task';
import {Category} from '../../domain/Category';
import {Priority} from '../../domain/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DialogAction, DialogResult} from '../DialogResult';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  private dialogTitle: string;
  private task: Task;
  private tmpTitle: string;
  private tmpCategory: Category;
  private tmpPriority: Priority;
  private tmpDate: Date;
  private categories: Category[];
  protected priorities: Priority[];
  private canShow = false;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, Category[], Priority[]],
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.categories = this.data[2];
    this.priorities = this.data[3];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;
    if (!this.task.id) {
      this.canShow = true;
    }
  }

  private onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.task));
  }

  private onCancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  private onDelete() {
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
        this.dialogRef.close(new DialogResult(DialogAction.DELETE));
      }
    });
  }

  private activateTask() {
    this.dialogRef.close(new DialogResult(DialogAction.ACTIVATE));
  }

  private completeTask() {
    this.dialogRef.close(new DialogResult(DialogAction.COMPLETE));
  }

  private isCanShow(): boolean {
    return this.canShow;
  }

  private compareObjects(o1: any, o2: any): boolean {
    if (o1 != null && o2 != null) {
      return o1.id === o2.id;
    }
    return false;
  }
}
