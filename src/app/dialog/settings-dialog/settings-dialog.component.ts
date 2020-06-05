import {Component, OnInit} from '@angular/core';
import {Priority} from '../../interfaces/priority';
import {MatDialogRef} from '@angular/material';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  private priorities: Priority[];

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>, private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  private onCLose() {
    this.dialogRef.close(false);
  }

  private onAddPriority(priority: Priority) {
    console.log('add priority', priority);
  }
}
