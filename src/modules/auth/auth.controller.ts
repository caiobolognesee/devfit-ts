import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "../../container";
import { loginBodySchema } from "./auth.schemas";

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = loginBodySchema.parse(request.body);

    const { accessToken } = await container.authService.login(body);
    return reply.send({ accessToken });
  }
}