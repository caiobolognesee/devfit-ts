import { FastifyInstance } from "fastify";
import { container } from "./container";
import { authMiddleware } from "./middlewares/auth.middleware";
import { loginBodyJsonSchema } from "./modules/auth/auth.schemas";

export async function registerRoutes(app: FastifyInstance) {
  app.register(async (userApp) => {
    userApp.post("/", container.userController.create.bind(container.userController));

    userApp.get(
      "/me",
      { preHandler: authMiddleware },
      async (request) => {
        return (request as any).user;
      }
    );

  }, { prefix: "/users" });

  app.post("/auth/login", container.authController.login.bind(container.authController));
}
