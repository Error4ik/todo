import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperationType} from '../OperationType';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  private category: Category;
  private tmpTitle: string;
  private dialogTitle: string;
  private operationType: OperationType;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string, OperationType],
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.category = this.data[0];
    this.dialogTitle = this.data[1];
    this.operationType = this.data[2];
    this.tmpTitle = this.category.title;
  }

  private onConfirm() {
    this.category.title = this.tmpTitle;
    this.dialogRef.close(this.category);
  }

  private onCancel() {
    this.dialogRef.close(false);
  }

  private onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm the action.',
        message: `Are you sure that you want to delete an category? ${this.tmpTitle}`,
        autoFocus: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  private isCanShow(): boolean {
    return this.operationType === OperationType.ADD;
  }
}
