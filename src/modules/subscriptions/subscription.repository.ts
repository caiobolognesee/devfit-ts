export interface SubscriptionRepository {
  findActiveByUserId(userId: string): Promise<Subscription | null>
  findAllByUserId(userId: string): Promise<Subscription[]>
  save(subscription: Subscription): Promise<void>
}
