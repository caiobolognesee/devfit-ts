export class GenerateWorkoutPlanUseCase {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private workoutRepository: WorkoutPlanRepository,
    private policyService: WorkoutGenerationPolicyService
  ) {}

  async execute(userId: string) {

    const subscription =
      await this.subscriptionRepository.findActiveByUserId(userId)

    const lastPlan =
      await this.workoutRepository.findLatestByUserId(userId)

    const canGenerate =
      this.policyService.canGenerate(subscription, lastPlan?.createdAt ?? null)

    if (!canGenerate) {
      throw new Error("Subscription expired. Upgrade to continue.")
    }

    // gerar treino
  }
}
