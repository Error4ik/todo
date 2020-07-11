import {Component, OnInit} from '@angular/core';
import {Task} from './domain/Task';
import {Category} from './domain/Category';
import {Priority} from './domain/Priority';
// import {zip} from 'rxjs';
// import {concatMap, map} from 'rxjs/operators';
import {IntroService} from './services/intro.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CategoryService} from './data/dao/impl/category.service';
import {TaskService} from './data/dao/impl/task.service';
import {SearchParams} from './data/dao/search/SearchParams';
import {PageEvent} from '@angular/material/paginator';
import {PriorityService} from './data/dao/impl/priority.service';

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
  private searchParams = new SearchParams();

  private selectedCategory = null;

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

  private readonly isMobile: boolean;
  private readonly isTablet: boolean;
  private totalTasksFounded: number;
  private showSearch: boolean;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private priorityService: PriorityService,
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
    this.taskService.add(task).subscribe(t => {
      this.searchTasks(this.searchParams);
      this.updateCategories();
    });
  }

  private onDeleteTask(task: Task): void {
    this.taskService.delete(task.id.toString()).subscribe(t => {
      this.searchTasks(this.searchParams);
      this.updateCategories();
    });
  }

  private onUpdateTask(task: Task): void {
    this.taskService.update(task).subscribe(t => {
      this.searchTasks(this.searchParams);
      this.updateCategories();
    });
  }

  private onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.searchParams.category = this.selectedCategory != null ? this.selectedCategory.id.toString() : null;
    this.searchTasks(this.searchParams);
  }

  private onAddCategory(category: Category): void {
    this.categoryService.add(category).subscribe(() => {
      this.updateCategories();
    });
  }

  private onDeleteCategory(category: Category): void {
    this.categoryService.delete(category.id.toString()).subscribe(() => {
      if (category === this.selectedCategory) {
        this.onSelectCategory(null);
      }
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

  private updatePriorities(): void {
    this.priorityService.getAll().subscribe(priorities => this.priorities = priorities);
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

  private updateCategories(): void {
    this.categoryService.findCategories(this.searchCategoryByTitle).subscribe(categories => {
      this.categories = categories;
    });
  }

  private searchTasks(searchParams: SearchParams) {
    this.searchParams = searchParams;
    this.taskService.findTasks(this.searchParams).subscribe((page) => {
      this.totalTasksFounded = page.totalElements;
      this.tasks = page.content;
    });
  }

  private paging(pageEvent: PageEvent) {
    if (this.searchParams.pageLimit !== pageEvent.pageSize) {
      this.searchParams.pageNumber = 0;
    } else {
      this.searchParams.pageNumber = pageEvent.pageIndex;
    }

    this.searchParams.pageLimit = pageEvent.pageSize;
    this.searchParams.pageNumber = pageEvent.pageIndex;

    this.searchTasks(this.searchParams);
  }

  private toggleSearch(showSearch: boolean) {
    this.showSearch = showSearch;
  }
}
