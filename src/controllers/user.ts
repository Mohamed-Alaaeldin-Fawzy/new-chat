import { UserRepository } from "../repository/userRepository";
import { User } from "../models/user";
import { NotFoundError } from "../Error/notFoundError";
import { BadRequestError } from "../Error/badRequestError";

export class UserController {
  constructor(public userRepository: UserRepository) {}

  async getUsers(): Promise<Object[]> {
    const users = await this.userRepository.getAllUsers();
    return users;
  }

  async getUserById(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async updateUser(id: string, user: User): Promise<Partial<User>> {
    if (!user) {
      throw new BadRequestError("please provide the update values");
    }

    const existingUser = await this.userRepository.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    const newUser = await this.userRepository.updateUser(id, user);
    if (!newUser) {
      throw new BadRequestError("Error while updating user");
    }

    return newUser;
  }

  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.userRepository.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    this.userRepository.deleteUser(id);
  }
}
