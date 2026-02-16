import { describe, it, expect } from "vitest"
import { WorkoutGenerationPolicyService } from "./domain/services/WorkoutGenerationPolicyService"
import { Subscription } from "./domain/Subscription"

describe("WorkoutGenerationPolicyService", () => {

  const policy = new WorkoutGenerationPolicyService()

  it("should block FREE user before 28 days", () => {
    const lastWorkout = new Date()
    lastWorkout.setDate(lastWorkout.getDate() - 10)

    const result = policy.evaluate(null, lastWorkout)

    expect(result.canGenerate).toBe(false)
    expect(result.daysRemaining).toBe(18)
  })

  it("should allow FREE user after 28 days", () => {
    const lastWorkout = new Date()
    lastWorkout.setDate(lastWorkout.getDate() - 30)

    const result = policy.evaluate(null, lastWorkout)

    expect(result.canGenerate).toBe(true)
  })

  it("should allow PRO user anytime", () => {
    const now = new Date()
    const expires = new Date()
    expires.setMonth(now.getMonth() + 1)

    const subscription = new Subscription(
      "1",
      "1",
      "PRO_MONTHLY",
      now,
      expires,
      null,
    )

    const lastWorkout = new Date()
    lastWorkout.setDate(lastWorkout.getDate() - 1)

    const result = policy.evaluate(subscription, lastWorkout)

    expect(result.canGenerate).toBe(true)
  })

})
