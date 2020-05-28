import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../interfaces/category';
import {MatDialog} from '@angular/material';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {DataHandlerService} from '../../services/data-handler.service';
import {Task} from '../../interfaces/task';
import {OperationType} from '../../dialog/OperationType';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input()
  categories: Category[];
  @Input()
  selectedCategory: Category;
  @Output()
  selectCategory = new EventEmitter<Category>();
  @Output()
  private deleteCategory = new EventEmitter<Category>();
  @Output()
  private updateCategory = new EventEmitter<Category>();
  @Output()
  private createCategory = new EventEmitter<Category>();

  private indexMouseMovie: number;

  constructor(private dialog: MatDialog, private dataHandlerService: DataHandlerService) {
  }

  ngOnInit() {
  }

  private showTasksByCategory(category: Category) {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  private showEditIcon(index: number) {
    this.indexMouseMovie = index;
  }

  openEditCategoryDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category, 'Edit category'], width: '500px', autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result as 'string' && result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }
      this.updateCategory.emit(category);
    });
  }

  private openAddCategoryDialog() {
    const category = new Category(null, '');
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category, 'Create category', OperationType.ADD], width: '500px', autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.createCategory.emit(result);
    });
  }
}
