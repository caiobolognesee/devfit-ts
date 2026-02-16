export class SubscriptionService {
  createMonthly(userId: string): Subscription {
    const now = new Date()
    const expiresAt = new Date(now)
    expiresAt.setMonth(now.getMonth() + 1)

    return new Subscription(
      userId,
      "PRO_MONTHLY",
      now,
      expiresAt
    )
  }

  createYearly(userId: string): Subscription {
    const now = new Date()
    const expiresAt = new Date(now)
    expiresAt.setFullYear(now.getFullYear() + 1)

    return new Subscription(
      userId,
      "PRO_YEARLY",
      now,
      expiresAt
    )
  }
}
