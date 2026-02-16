import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password, timezone } = request.body as any;

      const user = await this.userService.create({
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
  }
}
