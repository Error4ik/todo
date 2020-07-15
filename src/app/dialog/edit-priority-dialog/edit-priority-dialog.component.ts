import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogAction, DialogResult} from '../DialogResult';
import {Priority} from '../../domain/Priority';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {

  private priority: Priority;
  private tmpTitle: string;
  private dialogTitle: string;

  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Priority, string],
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.priority = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.priority.title;
  }

  private onConfirm() {
    this.priority.title = this.tmpTitle;
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.priority));
  }

  private onCancel() {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }
}
