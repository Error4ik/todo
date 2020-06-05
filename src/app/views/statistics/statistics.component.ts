import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @Input()
  private completedTasksInCategory: number;
  @Input()
  private totalTasksInCategory: number;
  @Input()
  private uncompletedTasksInCategory: number;
  @Input()
  private canShowStatistics: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
