import { Subscription } from "../../modules/Subscriptions.ts/subscription.controller"

export type WorkoutGenerationResult = {
  canGenerate: boolean
  daysRemaining?: number
}

export class WorkoutGenerationPolicyService {
  evaluate(
    subscription: Subscription | null,
    lastGeneratedAt: Date | null
  ): WorkoutGenerationResult {

    if (subscription?.isActive()) {
      return { canGenerate: true }
    }

    if (!lastGeneratedAt) {
      return { canGenerate: true }
    }

    const now = new Date()
    const diffInDays =
      (now.getTime() - lastGeneratedAt.getTime()) / (1000 * 60 * 60 * 24)

    const remaining = 28 - Math.floor(diffInDays)

    if (remaining <= 0) {
      return { canGenerate: true }
    }

    return {
      canGenerate: false,
      daysRemaining: remaining
    }
  }
}
