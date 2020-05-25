import {Component, Inject, OnInit} from '@angular/core';
import {Category} from '../../interfaces/category';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Task} from '../../interfaces/task';
import {DataHandlerService} from '../../services/data-handler.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  private categoryTitle: string;
  private dialogTitle: string;

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string],
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
  }

  onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm the action.',
        message: `Are you sure that you want to delete an task? ${this.categoryTitle}`,
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
