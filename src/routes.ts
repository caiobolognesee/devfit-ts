import { FastifyInstance } from "fastify";
import { UsersController } from "./modules/users/user.controller";
import { AuthController } from "./modules/auth/auth.controller";

const usersController = new UsersController();
const authController = new AuthController();

export async function registerRoutes(app: FastifyInstance) {
  app.register(async (usersApp) => {
    usersApp.post("/", usersController.create.bind(usersController));
  }, { prefix: "/users" });

  app.register(async (authApp) => {
    authApp.post("/login", authController.login.bind(authController));
  }, { prefix: "/auth" });
}
