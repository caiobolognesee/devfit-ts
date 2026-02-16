import { FastifyInstance } from "fastify";
import { userRoutes } from "./modules/users/user.controller";

export async function registerRoutes(app: FastifyInstance) {
  app.register(userRoutes);

  app.register(userRoutes, { prefix: "/users" });


  // Futuro:
  // app.register(authRoutes)
  // app.register(workoutRoutes)
}
