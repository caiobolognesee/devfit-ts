import Fastify from "fastify";
import { prisma } from "./db";
import { userRoutes } from "./modules/users/user.controller";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(userRoutes);

  app.get("/health", async () => {
    try {
      // lightweight DB check
      await prisma.$queryRaw`SELECT 1`;
      return { status: "ok", db: "up" };
    } catch (err) {
      app.log.error({ err }, "Database health check failed");
      return { status: "ok", db: "down" };
    }
  });

  return app;
}
