export class FitnessProfile {
  constructor(
    public weight: number,
    public height: number,
    public weeklyTrainingDays: number,
    public experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  ) {
    this.validate()
  }

  private validate() {
    if (this.weight <= 0) throw new Error("Invalid weight")
    if (this.height <= 0) throw new Error("Invalid height")
    if (this.weeklyTrainingDays < 1 || this.weeklyTrainingDays > 7) {
      throw new Error("Weekly training days must be between 1 and 7")
    }
  }

  getBMI(): number {
    const heightInMeters = this.height / 100
    return this.weight / (heightInMeters * heightInMeters)
  }
}
