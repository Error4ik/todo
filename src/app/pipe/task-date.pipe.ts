import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe extends DatePipe implements PipeTransform {
  transform(date: Date | string, format: 'mediumDate'): string {
    if (date === null) {
      return 'Without date';
    }

    const currentDate = new Date().getDate();
    date = new Date(date);

    if (date.getDate() === currentDate) {
      return 'Today';
    }
    if (date.getDate() === currentDate + 1) {
      return 'Tomorrow';
    }
    if (date.getDate() === currentDate - 1) {
      return 'Yesterday';
    }
    return new DatePipe('ru-Ru').transform(date, format);
  }
}
