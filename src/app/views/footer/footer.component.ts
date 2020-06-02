import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AboutDialogComponent} from '../../dialog/about-dialog/about-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private site: 'http://www.english.com';
  private blog: 'http://www.english.com/blog';
  private year: Date;
  private siteName: 'English';

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.year = new Date();
  }

  private openAboutDialog() {
    this.dialog.open(AboutDialogComponent, {
      data: {
        dialogTitle: 'About program',
        message: 'This is my dialog!!!'
      },
      autoFocus: false,
      width: '500px'
    });
  }
}
