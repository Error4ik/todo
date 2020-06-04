import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @Input()
  completedTasksInCategory: number;
  @Input()
  totalTasksInCategory: number;
  @Input()
  uncompletedTasksInCategory: number;

  constructor() {
  }

  ngOnInit() {
  }

}
