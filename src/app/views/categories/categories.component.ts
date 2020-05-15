import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input()
  private categories: Category[];

  @Output()
  private selectCategory = new EventEmitter<Category>();

  private selectedCategory: Category;

  constructor() {
  }

  ngOnInit() {
  }

  showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }
}
