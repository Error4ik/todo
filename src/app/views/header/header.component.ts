import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SettingsDialogComponent} from '../../dialog/settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  private categoryName: string;
  @Input()
  private canShowStatistics: boolean;
  @Output()
  private toggleStatistics = new EventEmitter<boolean>();
  @Output()
  private helpIntro = new EventEmitter<any>();
  @Output()
  private toggleMenu = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  private onToggleStatistics() {
    this.toggleStatistics.emit(!this.canShowStatistics);
  }

  private showSettings() {
    this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '600px'
    });
  }

  private showIntroHelp() {
    this.helpIntro.emit(false);
  }

  private onToggleMenu() {
    this.toggleMenu.emit();
  }
}
