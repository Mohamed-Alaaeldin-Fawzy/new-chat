import { User } from "../model/user";
import { UserRepository } from "../repository/userRepository";

export class AuthController {
  constructor(public userRepository: UserRepository) {}
  async register(user: User) {
    return await this.userRepository.createUser(user);
  }
  async login(email: string, password: string) {
    return await this.userRepository.getUserByEmailAndPassword(email, password);
  }
}
