import Fastify from "fastify";
import { registerRoutes } from "./routes";
import { AppError } from "./errors/app-error";

export async function buildApp() {
  const app = Fastify({ logger: true });

  app.setErrorHandler((error, request, reply) => {
    // AppError: errors "waiting" of domain
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
        code: error.code,
      });
    }

    // Fastify validation error (when we go validate body/params)
    // @ts-expect-error fastify error typing varies by version
    if (error.validation) {
      return reply.status(400).send({
        message: "Validation error",
        details: error.validation,
      });
    }

    request.log.error({ err: error }, "Unhandled error");
    return reply.status(500).send({ message: "Internal server error" });
  });

  await registerRoutes(app);
  return app;
}