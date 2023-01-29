import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../domain/Category';
import {MatDialog} from '@angular/material';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {DialogAction} from '../../dialog/DialogResult';
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

  private indexMouseMove: number;
  private filterTitle = '';

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

  private openAddCategoryDialog() {
    const category = new Category(null, '');
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category, 'Create category'], width: '500px', autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      if (result.action === DialogAction.SAVE) {
        this.addCategory.emit(result.object);
      }
    });
  }

  private openEditCategoryDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category, 'Edit category'], width: '500px', autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result.action === DialogAction.DELETE) {
        this.deleteCategory.emit(category);
        return;
      }
      if (result.action === DialogAction.SAVE) {
        this.updateCategory.emit(category);
        return;
      }
    });
  }

  private onFilterByCategoryName() {
    this.searchCategory.emit(this.filterTitle);
  }

  private clearAndSearch() {
    this.filterTitle = '';
    this.onFilterByCategoryName();
  }

  private checkTitle() {
    if (this.filterTitle === '') {
      this.onFilterByCategoryName();
    }
  }
}
