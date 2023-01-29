export class RequestTask {
  title: string;
  completed: number;
  priorityId: string;
  categoryId: string;
  date?: Date;

  constructor(title: string, completed: number, priorityId: string, categoryId: string, date: Date) {
    this.title = title;
    this.completed = completed;
    this.priorityId = priorityId;
    this.categoryId = categoryId;
    this.date = date;
  }
}
