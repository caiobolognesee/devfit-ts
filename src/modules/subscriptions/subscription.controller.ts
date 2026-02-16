export type SubscriptionPlan =
  | "PRO_MONTHLY"
  | "PRO_YEARLY"

export class Subscription {
  constructor(
    public id: string,
    public userId: string,
    public plan: SubscriptionPlan,
    public startedAt: Date,
    public expiresAt: Date,
    public cancelledAt: Date | null
  ) {}

  isActive(referenceDate: Date = new Date()): boolean {
    return referenceDate < this.expiresAt
  }

  isExpired(referenceDate: Date = new Date()): boolean {
    return referenceDate >= this.expiresAt
  }

  isCancelled(): boolean {
    return this.cancelledAt !== null
  }
}
