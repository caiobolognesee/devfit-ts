export class WorkoutPlanGeneratorService {
  generate(profile: FitnessProfile): "BEGINNER" | "INTERMEDIATE" | "ADVANCED" {
    const bmi = profile.getBMI()

    if (
      profile.experienceLevel === "BEGINNER" ||
      profile.weeklyTrainingDays <= 2
    ) {
      return "BEGINNER"
    }

    if (
      profile.experienceLevel === "INTERMEDIATE" &&
      profile.weeklyTrainingDays >= 3 &&
      bmi < 30
    ) {
      return "INTERMEDIATE"
    }

    return "ADVANCED"
  }
}
