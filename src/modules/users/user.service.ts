import { UserRepository } from "./user.repository";
import bcrypt from "bcrypt";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  timezone?: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDTO) {
    // 1️⃣ Validar nome
    if (!data.name || data.name.trim().split(" ").length < 2) {
      throw new Error("Name must contain at least first and last name");
    }

    // 2️⃣ Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Invalid email format");
    }

    // 3️⃣ Validar senha
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(data.password)) {
      throw new Error(
        "Password must have 8 characters, uppercase, lowercase, number and symbol"
      );
    }

    // 4️⃣ Verificar se email já existe
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // 5️⃣ Gerar hash
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 6️⃣ Criar usuário
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      timezone: data.timezone ?? "America/Sao_Paulo"
    });

    // 7️⃣ Retornar sem senha
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
