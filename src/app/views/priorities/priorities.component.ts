import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from '../../domain/Priority';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {EditPriorityDialogComponent} from '../../dialog/edit-priority-dialog/edit-priority-dialog.component';
import {DialogAction} from '../../dialog/DialogResult';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fff';

  @Input()
  private priorities: Priority[];

  @Output()
  private deletePriority = new EventEmitter<Priority>();
  @Output()
  private editPriority = new EventEmitter<Priority>();
  @Output()
  private addPriority = new EventEmitter<Priority>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  private onEditPriority(priority: Priority) {
    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {
      data: [priority, 'Edit priority'], width: '500px', autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === DialogAction.SAVE) {
        this.editPriority.emit(result.object);
        return;
      }
    });
  }

  private onDeletePriority(priority: Priority) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm the action',
        message: `Are you sure that you want to delete an priority? ${priority.title}`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === DialogAction.OK) {
        this.deletePriority.emit(priority);
      }
    });
  }

  private onAddPriority() {
    const priority = new Priority(null, '', PrioritiesComponent.defaultColor);
    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {
      maxWidth: '500px',
      data: [priority, 'Creating priority'], width: '500px', autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === DialogAction.SAVE) {
        this.addPriority.emit(result.object);
      }
    });
  }
}
