import { FastifyInstance } from "fastify";
import { container } from "./container";

export async function registerRoutes(app: FastifyInstance) {
  app.register(async (userApp) => {
    userApp.post("/", container.userController.create.bind(container.userController));
  }, { prefix: "/users" });

  app.register(async (authApp) => {
    authApp.post("/login", container.authController.login.bind(container.authController));
  }, { prefix: "/auth" });
}
