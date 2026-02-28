import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

interface JwtPayload {
  sub: string;
  email: string;
}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: "Token not provided" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return reply.status(401).send({ message: "Invalid token format" });
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  // add user in request
  (request as any).user = {
    id: decoded.sub,
    email: decoded.email,
  };
}
