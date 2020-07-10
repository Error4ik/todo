import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {DialogAction, DialogResult} from '../DialogResult';
import {Category} from '../../domain/Category';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  private category: Category;
  private tmpTitle: string;
  private dialogTitle: string;
  private canDelete = false;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string],
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.category = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.category.title;
    if (this.category.id) {
      this.canDelete = true;
    }
  }

  private onConfirm() {
    this.category.title = this.tmpTitle;
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.category));
  }

  private onCancel() {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  private onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm the action.',
        message: `Are you sure that you want to delete an category? ${this.category.title}`,
        autoFocus: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result.action === DialogAction.OK) {
        this.dialogRef.close(new DialogResult(DialogAction.DELETE));
      }
    });
  }

  private isCanShow(): boolean {
    return this.canDelete;
  }
}
