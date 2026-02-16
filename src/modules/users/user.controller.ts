import { FastifyInstance } from "fastify";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", async (request, reply) => {
    try {
      const { name, email, password, timezone } = request.body as any;

      const repository = new UserRepository();
      const service = new UserService(repository);

      const user = await service.create({
        name,
        email,
        password,
        timezone,
      });

      return reply.status(201).send(user);
    } catch (error: any) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  });
}
