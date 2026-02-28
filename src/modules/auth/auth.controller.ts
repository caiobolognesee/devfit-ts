import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any; // depois a gente troca pelo Zod

    const { accessToken } = await this.authService.login({ email, password });
    return reply.send({ accessToken });
  }
}