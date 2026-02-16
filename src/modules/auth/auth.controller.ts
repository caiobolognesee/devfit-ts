import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any;

    const result = await this.authService.login({ email, password });

    return reply.send(result);
  }
}
