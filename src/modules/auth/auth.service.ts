import { UserRepository } from "../users/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface LoginDTO {
  email: string;
  password: string;
}

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return {
      accessToken: token,
    };
  }
}
