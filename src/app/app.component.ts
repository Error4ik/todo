import {Component, OnInit} from '@angular/core';
import {Task} from './domain/Task';
import {Category} from './domain/Category';
import {Priority} from './domain/Priority';
import {IntroService} from './services/intro.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {CategoryService} from './data/dao/impl/category.service';
import {TaskService} from './data/dao/impl/task.service';
import {SearchParams} from './data/dao/search/SearchParams';
import {PageEvent} from '@angular/material/paginator';
import {PriorityService} from './data/dao/impl/priority.service';
import {StatService} from './data/dao/impl/stat.service';
import {Stat} from './domain/Stat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private tasks: Task[];
  private categories: Category[];
  private priorities: Priority[];
  private stat: Stat;
  private searchParams = new SearchParams();

  private selectedCategory = null;
  private searchCategoryByTitle = '';

  private totalTasksCountInCategory = 0;
  private completedTasksCountInCategory = 0;
  private uncompletedTasksCountInCategory = 0;
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
    private statService: StatService,
    private introService: IntroService,
    private deviseService: DeviceDetectorService) {
    this.isMobile = this.deviseService.isMobile();
    this.isTablet = this.deviseService.isTablet();
    this.canShowStatistics = !this.isMobile;
  }

  ngOnInit(): void {
    this.updatePriorities();
    this.updateCategories();
    this.updateStatistics();
    this.onSelectCategory(this.selectedCategory);
    this.setMenuValue();
    if (!this.isMobile && !this.isTablet) {
      this.introService.startIntroJS(true);
    }
  }

  private onAddTask(task: Task): void {
    this.taskService.add(task).subscribe(t => {
      this.updateCategories();
      this.onSelectCategory(this.selectedCategory);
      this.updateStatistics();
    });
  }

  private onDeleteTask(task: Task): void {
    this.taskService.delete(task.id.toString()).subscribe(t => {
      this.updateCategories();
      this.onSelectCategory(this.selectedCategory);
      this.updateStatistics();
    });
  }

  private onUpdateTask(task: Task): void {
    this.taskService.update(task.id.toString(), task).subscribe(t => {
      this.updateCategories();
      this.updateStatistics();
    });
  }

  private onAddCategory(category: Category): void {
    this.categoryService.add(category).subscribe(() => {
      this.updateCategories();
    });
  }

  private onDeleteCategory(category: Category): void {
    this.categoryService.delete(category.id.toString()).subscribe(() => {
      if (category === this.selectedCategory) {
        this.selectedCategory = null;
        this.onSelectCategory(this.selectedCategory);
      }
      this.updateCategories();
    });
  }

  private onUpdateCategory(category: Category): void {
    this.categoryService.update(category.id.toString(), category).subscribe(() => {
      this.updateCategories();
      this.onSelectCategory(this.selectedCategory);
    });
  }

  private onSearchCategoryByTitle(categoryName: string): void {
    this.searchCategoryByTitle = categoryName;
    this.updateCategories();
  }

  private updatePriorities(): void {
    this.priorityService.getAll().subscribe(priorities => this.priorities = priorities);
  }

  private updateStatistics() {
    this.statService.getStats().subscribe(stats => {
      this.stat = stats[0];
      if (this.selectedCategory === null) {
        this.uncompletedTotalTasksCount = this.stat.uncompletedTotal;
        this.totalTasksCountInCategory = this.stat.completedTotal + this.stat.uncompletedTotal;
        this.completedTasksCountInCategory = this.stat.completedTotal;
        this.uncompletedTasksCountInCategory = this.stat.uncompletedTotal;
        this.uncompletedTotalTasksCount = this.stat.uncompletedTotal;
      } else {
        this.totalTasksCountInCategory = this.selectedCategory.completedCount + this.selectedCategory.uncompletedCount;
        this.completedTasksCountInCategory = this.selectedCategory.completedCount;
        this.uncompletedTasksCountInCategory = this.selectedCategory.uncompletedCount;
        this.uncompletedTotalTasksCount = this.stat.uncompletedTotal;
      }
    });
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
      this.categories.forEach(cat => {
        if (this.selectedCategory && cat.id === this.selectedCategory.id) {
          this.selectedCategory = cat;
          this.updateStatistics();
          return;
        }
      });
    });
  }

  private onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.updateStatistics();
    this.searchParams.category = this.selectedCategory != null ? this.selectedCategory.id.toString() : null;
    this.searchTasks(this.searchParams);
  }

  private searchTasks(searchParams: SearchParams) {
    this.searchParams = searchParams;
    this.taskService.findTasks(this.searchParams).subscribe((tasks) => {
      this.tasks = tasks;
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

  private changeSettings() {
    this.searchTasks(this.searchParams);
    this.updatePriorities();
  }
}
