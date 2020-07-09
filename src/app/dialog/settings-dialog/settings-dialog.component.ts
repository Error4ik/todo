import {Component, OnInit} from '@angular/core';
import {Priority} from '../../domain/Priority';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  private priorities: Priority[];

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>) {
  }

  ngOnInit() {
    // this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  private onCLose() {
    this.dialogRef.close(false);
  }

  private onAddPriority(priority: Priority) {
    // this.dataHandlerService.addPriority(priority);
  }

  private onDeletePriority(priority: Priority) {
    // this.dataHandlerService.deletePriority(priority);
  }

  private onEditPriority(priority: Priority) {
    // this.dataHandlerService.editPriority(priority);
  }
}
