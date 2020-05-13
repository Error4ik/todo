import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input()
  private categories: Category[];
  private selectedCategory: Category;

  constructor() {
  }

  ngOnInit() {
  }

  showTasksByCategory(category: Category) {
    // this.selectedCategory = category;
    // this.dataHandlerService.fillTasksByCategory(category);
  }
}
