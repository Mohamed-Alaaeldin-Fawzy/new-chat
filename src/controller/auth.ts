import { User } from "../model/user";
import { UserRepository } from "../repository/userRepository";

export class AuthController {
  constructor(public userRepository: UserRepository) {}
  async register(user: User) {
    if (!user.id) {
      user.id = Math.ceil(Math.random() * 100).toString();
    }
    return await this.userRepository.createUser(user);
  }
  async login(email: string, password: string) {
    return await this.userRepository.getUserByEmailAndHashedPassword(
      email,
      password
    );
  }
}
