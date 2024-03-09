import { UserRepository } from "../repository/user";
import { User } from "../models/user";
import { NotFoundError } from "../Error/notFoundError";
import { BadRequestError } from "../Error/badRequestError";

export class UserController {
  constructor(public userRepository: UserRepository) {}

  async getUsers(): Promise<Object[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    });
  }

  async getUserById(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.getUserById(id);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
