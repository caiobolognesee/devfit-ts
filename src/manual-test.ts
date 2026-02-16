import readline from "readline"
import { WorkoutGenerationPolicyService } from "./modules/workouts/workoutGenerationPolicy.service"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const policy = new WorkoutGenerationPolicyService()

rl.question("Days since last workout: ", (answer) => {
  const days = Number(answer)

  const lastWorkout = new Date()
  lastWorkout.setDate(lastWorkout.getDate() - days)

  const result = policy.evaluate(null, lastWorkout)

  console.log("Result:", result)

  rl.close()
})
