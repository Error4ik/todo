import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogResult} from '../DialogResult';
import {Priority} from '../../domain/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {

  private priority: Priority;
  private tmpTitle: string;
  private dialogTitle: string;
  private operationType: DialogResult;

  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Priority, string, DialogResult],
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.priority = this.data[0];
    this.dialogTitle = this.data[1];
    this.operationType = this.data[2];
    this.tmpTitle = this.priority.title;
  }

  private onConfirm() {
    this.priority.title = this.tmpTitle;
    this.dialogRef.close(this.priority);
  }

  private onCancel() {
    this.dialogRef.close(false);
  }

  private isCanShow() {
    return true;
  }

  private onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm the action.',
        message: `Are you sure that you want to delete an priority? ${this.tmpTitle}`,
        autoFocus: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }
}
