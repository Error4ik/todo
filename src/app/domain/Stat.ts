export class Stat {
  id: string;
  completedTotal: number;
  uncompletedTotal: number;

  constructor(id: string, completedTotal: number, uncompletedTotal: number) {
    this.id = id;
    this.completedTotal = completedTotal;
    this.uncompletedTotal = uncompletedTotal;
  }
}
