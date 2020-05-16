import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Task} from 'src/app/interfaces/task';
import {DataHandlerService} from '../../services/data-handler.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  private dialogTitle: string;
  private task: Task;

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    console.log(this.task);
  }
}
