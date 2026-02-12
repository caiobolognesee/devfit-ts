import "dotenv/config";
import { buildApp } from "./app";
import { prisma } from "./db";

const app = buildApp();

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

async function start() {
  await app.listen({ port, host });
}

async function shutdown(signal: string) {
  app.log.info({ signal }, "Shutting down...");
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
