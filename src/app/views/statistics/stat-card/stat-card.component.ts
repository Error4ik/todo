import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent implements OnInit {
  @Input()
  private completed = false;
  @Input()
  private iconName: string;
  @Input()
  private count1: any;
  @Input()
  private countTotal: any;
  @Input()
  private title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
