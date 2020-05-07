import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Category} from '../../interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandlerService.categoriesSubject.subscribe(categories => this.categories = categories);
  }

  showTasksByCategory(category: Category) {
    this.dataHandlerService.fillTasksByCategory(category);
  }
}
