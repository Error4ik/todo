export class SearchParams {
  title = '';
  completed: number = null;
  priority: string = null;
  category: string = null;
  pageNumber = 0;
  pageLimit = 10;
  sortColumn = 'title';
  sortDirection = 'asc';
}
