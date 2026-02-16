import { UserRepository } from "./modules/users/user.repository";
import { AuthService } from "./modules/auth/auth.service";
import { AuthController } from "./modules/auth/auth.controller";
import { UserService } from "./modules/users/user.service";
import { UserController } from "./modules/users/user.controller";

// Repositories
const userRepository = new UserRepository();

// Services
const userService = new UserService(userRepository);
const authService = new AuthService(userRepository);

// Controllers
const userController = new UserController(userService);
const authController = new AuthController(authService);

export const container = {
  userController,
  authController,
};
