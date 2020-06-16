import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../interfaces/category';
import {MatDialog} from '@angular/material';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {OperationType} from '../../dialog/OperationType';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input()
  private categories: Category[];
  @Input()
  private selectedCategory: Category;
  @Input()
  private uncompletedTotal: number;
  @Output()
  private selectCategory = new EventEmitter<Category>();
  @Output()
  private deleteCategory = new EventEmitter<Category>();
  @Output()
  private updateCategory = new EventEmitter<Category>();
  @Output()
  private addCategory = new EventEmitter<Category>();
  @Output()
  private searchCategory = new EventEmitter<string>();
  private isMobile: boolean;
  private isTablet: boolean;

  @Input('categoryMap')
  set setCategoryMap(categoryMap: Map<Category, number>) {
    this.selectedCategoryMap = categoryMap;
  }

  private indexMouseMove: number;
  private searchCategoryText: string;
  private selectedCategoryMap = new Map<Category, number>();

  constructor(private dialog: MatDialog, private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
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
    this.indexMouseMove = index;
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
      this.addCategory.emit(result);
    });
  }

  onFilterByCategoryName() {
    this.searchCategory.emit(this.searchCategoryText);
  }
}
