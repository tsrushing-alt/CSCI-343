export default class Plan {
  constructor(id, title, numDays = 2, numWeeks = 3) {
    this.id = id;
    this.title = title;
    this.numDays = numDays;
    this.numWeeks = numWeeks;  // <-- must be stored!
    this.days = Array.from({ length: numDays }, (_, i) => ({
      dayIndex: i,
      completed: false,
      muscleGroups: []
    }));
  }
}

