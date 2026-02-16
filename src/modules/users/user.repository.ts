import { prisma } from "../../db";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  timezone?: string;
}

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDTO) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        timezone: data.timezone ?? "America/Sao_Paulo",
      },
    });
  }
}
