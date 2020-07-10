import {Component, OnInit} from '@angular/core';
import {Task} from './domain/Task';
import {Category} from './domain/Category';
import {Priority} from './domain/Priority';
// import {zip} from 'rxjs';
// import {concatMap, map} from 'rxjs/operators';
import {IntroService} from './services/intro.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CategoryService} from './data/dao/impl/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'todo';
  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[];

  private selectedCategory: Category = null;

  private searchTaskByTitle: string;
  private searchCategoryByTitle: string;

  private filterByStatus: boolean;
  private filterPriority: Priority;

  private totalTasksCountInCategory: number;
  private completedTasksCountInCategory: number;
  private uncompletedTasksCountInCategory: number;
  private uncompletedTotalTasksCount = 0;
  private canShowStatistics = true;

  private menuOpened: boolean;
  private menuMode: string;
  private menuPosition: string;
  private showBackdrop: boolean;

  private isMobile: boolean;
  private isTablet: boolean;

  constructor(
    private categoryService: CategoryService,
    private introService: IntroService,
    private deviseService: DeviceDetectorService) {
    this.isMobile = this.deviseService.isMobile();
    this.isTablet = this.deviseService.isTablet();
    this.canShowStatistics = !this.isMobile;
  }

  ngOnInit(): void {
    this.updatePriorities();
    this.updateCategories();
    this.onSelectCategory(null);
    this.setMenuValue();
    if (!this.isMobile && !this.isTablet) {
      this.introService.startIntroJS(true);
    }
  }

  private onAddTask(task: Task): void {
    // this.dataHandlerService.addTask(task)
    //   .pipe(concatMap(item => {
    //       return this.dataHandlerService.getUncompletedCountInCategory(item.category)
    //         .pipe(map(count => {
    //           return ({item, count});
    //         }));
    //     }
    //   )).subscribe(result => {
    //   const task1 = result.item as Task;
    //   if (task1.category) {
    //     this.categoryMap.set(task1.category, result.count);
    //   }
    //   this.updateTasksAndStatistics();
    // });
  }

  private onDeleteTask(task: Task): void {
    // this.dataHandlerService.deleteTask(task.id)
    //   .pipe(concatMap(item => {
    //       return this.dataHandlerService.getUncompletedCountInCategory(item.category)
    //         .pipe(map(count => {
    //           return ({item, count});
    //         }));
    //     }
    //   )).subscribe(result => {
    //   const task1 = result.item as Task;
    //   if (task1.category) {
    //     this.categoryMap.set(task1.category, result.count);
    //   }
    //   this.updateTasksAndStatistics();
    // });
  }

  private onUpdateTask(task: Task): void {
    // this.dataHandlerService.updateTask(task).subscribe(() => {
    //   this.updateCategories();
    //   this.updateTasksAndStatistics();
    // });
  }

  private onSearchTaskByTitle(title: string): void {
    this.searchTaskByTitle = title;
    this.updateTasksAndStatistics();
  }

  private onFilterTasksByStatus(status: boolean): void {
    this.filterByStatus = status;
    this.updateTasksAndStatistics();
  }

  private onFilterTasksByPriority(priority: Priority): void {
    this.filterPriority = priority;
    this.updateTasksAndStatistics();
  }

  private onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.updateTasksAndStatistics();
  }

  private onAddCategory(category: Category): void {
    this.categoryService.add(category).subscribe(() => {
      this.updateCategories();
    });
  }

  private onDeleteCategory(category: Category): void {
    this.categoryService.delete(category.id.toString()).subscribe(() => {
      this.updateCategories();
    });
  }

  private onUpdateCategory(category: Category): void {
    this.categoryService.update(category).subscribe(() => {
      this.updateCategories();
    });
  }

  private onSearchCategoryByTitle(categoryName: string): void {
    this.searchCategoryByTitle = categoryName;
    this.updateCategories();
  }

  private updateTasksAndStatistics(): void {
    // this.dataHandlerService.searchTasks(this.selectedCategory, this.searchTaskByTitle, this.filterByStatus, this.filterPriority)
    //   .subscribe((tasks: Task[]) => {
    //     this.tasks = tasks;
    //   });
    // this.updateStatistics();
  }

  private updateCategories(): void {
    this.categoryService.findCategories(this.searchCategoryByTitle).subscribe(categories => {
      this.categories = categories;
    });
  }

  private updatePriorities(): void {
    // this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  private updateStatistics() {
    // zip(
    //   this.dataHandlerService.getTotalTasksCountInCategory(this.selectedCategory),
    //   this.dataHandlerService.getCompletedCountInCategory(this.selectedCategory),
    //   this.dataHandlerService.getUncompletedCountInCategory(this.selectedCategory),
    //   this.dataHandlerService.getUncompletedTotalCount()
    // ).subscribe(array => {
    //   this.totalTasksCountInCategory = array[0];
    //   this.completedTasksCountInCategory = array[1];
    //   this.uncompletedTasksCountInCategory = array[2];
    //   this.uncompletedTotalTasksCount = array[3];
    // });
  }

  private toggleStatistics(showStat: boolean) {
    this.canShowStatistics = showStat;
  }

  private onHelpIntro(value: boolean) {
    this.introService.startIntroJS(value);
  }

  private setMenuValue() {
    this.menuPosition = 'left';
    if (this.isMobile) {
      this.menuOpened = false;
      this.menuMode = 'over';
      this.showBackdrop = true;
    } else {
      this.menuOpened = true;
      this.menuMode = 'push';
      this.showBackdrop = false;
    }
  }

  private toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  private onClosedMenu() {
    this.menuOpened = false;
  }
}
