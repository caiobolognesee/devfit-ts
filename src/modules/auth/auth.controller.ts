import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../users/user.repository";
import { AuthService } from "./auth.service";

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any;

    const repository = new UserRepository();
    const service = new AuthService(repository);

    const result = await service.login({ email, password });

    return reply.send(result);
  }
}
