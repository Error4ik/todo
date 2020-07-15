import {Component, OnInit} from '@angular/core';
import {Priority} from '../../domain/Priority';
import {MatDialogRef} from '@angular/material';
import {PriorityService} from '../../data/dao/impl/priority.service';
import {DialogAction, DialogResult} from '../DialogResult';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  private priorities: Priority[];
  private settingsChanges = false;

  constructor(
    private priorityService: PriorityService,
    private dialogRef: MatDialogRef<SettingsDialogComponent>) {
  }

  ngOnInit() {
    this.priorityService.getAll().subscribe(priorities => this.priorities = priorities);
  }

  private onCLose() {
    if (this.settingsChanges) {
      this.dialogRef.close(new DialogResult(DialogAction.SETTINGS_CHANGE));
    } else {
      this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
    }
  }

  private onAddPriority(priority: Priority) {
    this.settingsChanges = true;
    this.priorityService.add(priority).subscribe(p => {
      this.priorities.push(p);
    });
  }

  private onDeletePriority(priority: Priority) {
    this.settingsChanges = true;
    this.priorityService.delete(priority.id.toString()).subscribe(() => {
      this.priorities.splice(this.getPriorityNumber(priority), 1);
    });
  }

  private onEditPriority(priority: Priority) {
    this.settingsChanges = true;
    this.priorityService.update(priority).subscribe(() => {
      this.priorities[this.getPriorityNumber(priority)] = priority;
    });
  }

  private getPriorityNumber(priority: Priority): number {
    return this.priorities.indexOf(this.priorities.find(p => p.id === priority.id));
  }
}
