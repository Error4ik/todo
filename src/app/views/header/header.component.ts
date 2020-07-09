import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SettingsDialogComponent} from '../../dialog/settings-dialog/settings-dialog.component';
import {DeviceDetectorService} from 'ngx-device-detector';

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

  private isMobile: boolean;

  constructor(private dialog: MatDialog, private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
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
