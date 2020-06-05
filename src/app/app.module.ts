import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CategoriesComponent} from './views/categories/categories.component';
import {TasksComponent} from './views/tasks/tasks.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {TaskDaoArray} from './data/dao/impl/TaskDaoArray';
import {CategoryDaoArray} from './data/dao/impl/CategoryDaoArray';
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {PriorityDaoArray} from './data/dao/impl/PriorityDaoArray';
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {TaskDatePipe} from './pipe/task-date.pipe';

import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {EditCategoryDialogComponent} from './dialog/edit-category-dialog/edit-category-dialog.component';
import {FooterComponent} from './views/footer/footer.component';
import {AboutDialogComponent} from './dialog/about-dialog/about-dialog.component';
import {HeaderComponent} from './views/header/header.component';
import {StatisticsComponent} from './views/statistics/statistics.component';
import {StatCardComponent} from './views/statistics/stat-card/stat-card.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {SettingsDialogComponent} from './dialog/settings-dialog/settings-dialog.component';
import { PrioritiesComponent } from './views/priorities/priorities.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    FooterComponent,
    AboutDialogComponent,
    HeaderComponent,
    StatisticsComponent,
    StatCardComponent,
    SettingsDialogComponent,
    PrioritiesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ColorPickerModule
  ],
  providers: [TaskDaoArray, CategoryDaoArray, PriorityDaoArray],
  entryComponents: [
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    EditCategoryDialogComponent,
    AboutDialogComponent,
    SettingsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
