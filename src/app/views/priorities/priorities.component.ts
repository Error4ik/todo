import {Component, Input, OnInit, Output} from '@angular/core';
import {Priority} from '../../interfaces/priority';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  @Input()
  private priorities: Priority[];

  constructor() {
  }

  ngOnInit() {
  }

  onEditPriority(priority: Priority) {
    console.log('edit', priority);
  }

  deletePriority(priority: Priority) {
    console.log('delete', priority);
  }
}
