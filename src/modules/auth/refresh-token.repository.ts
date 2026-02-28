import { prisma } from "../../db";
import { RefreshToken } from "@prisma/client";

export class RefreshTokenRepository {
  create(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<RefreshToken> {
    return prisma.RefreshToken.create({ data });
  }

  findByHash(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<RefreshToken> {
    return prisma.RefreshToken.create({ data });
  }

  revoke(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<RefreshToken> {
    return prisma.RefreshToken.create({ data });
  }

  revokeAllForUser(userId: string): Promise< count: number > {
    return prisma.RefreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() }.
    });
  }
}