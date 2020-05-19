import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Task} from 'src/app/interfaces/task';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../interfaces/category';
import {Priority} from '../../interfaces/priority';

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

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
