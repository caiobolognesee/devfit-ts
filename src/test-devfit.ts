// ===== Entities =====

type SubscriptionPlan = "PRO_MONTHLY" | "PRO_YEARLY"

class Subscription {
  constructor(
    public plan: SubscriptionPlan,
    public startedAt: Date,
    public expiresAt: Date,
    public cancelledAt: Date | null
  ) {}

  isActive(): boolean {
    return new Date() < this.expiresAt
  }
}

class FitnessProfile {
  constructor(
    public weight: number,
    public height: number,
    public weeklyTrainingDays: number,
    public experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  ) {
    if (weight <= 0) throw new Error("Invalid weight")
    if (height <= 0) throw new Error("Invalid height")
  }

  getBMI(): number {
    const heightInMeters = this.height / 100
    return this.weight / (heightInMeters * heightInMeters)
  }
}

// ===== Domain Service =====

type WorkoutGenerationResult = {
  canGenerate: boolean
  daysRemaining?: number
}

class WorkoutGenerationPolicyService {
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

// ===== Test =====

const policy = new WorkoutGenerationPolicyService()

// Simular usuário FREE que gerou treino há 10 dias
const lastWorkout = new Date()
lastWorkout.setDate(lastWorkout.getDate() - 10)

const resultFree = policy.evaluate(null, lastWorkout)

console.log("FREE USER:", resultFree)

// Simular usuário PRO ativo
const now = new Date()
const expires = new Date()
expires.setMonth(now.getMonth() + 1)

const proSubscription = new Subscription(
  "PRO_MONTHLY",
  now,
  expires,
  null
)

const resultPro = policy.evaluate(proSubscription, lastWorkout)

console.log("PRO USER:", resultPro)
