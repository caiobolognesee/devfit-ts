import { buildApp } from "./app";
import { prisma } from "./db";

async function main() {
  const app = await buildApp();

  const closeGracefully = async () => {
    try {
      await app.close();
      await prisma.$disconnect();
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  process.on("SIGINT", closeGracefully);
  process.on("SIGTERM", closeGracefully);

  await app.listen({ port: 3000, host: "0.0.0.0" });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});