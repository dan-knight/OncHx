export default abstract class Event {
  date: Date;

  constructor(date?: Date) {
    this.date = date ?? new Date();
  }
}