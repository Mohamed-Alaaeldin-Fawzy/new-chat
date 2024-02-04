import { UserRepository } from "../repository/userRepository";
import { User } from "../model/user";
import { NotFoundError } from "../Error/notFoundError";
import { BadRequestError } from "../Error/badRequestError";

export class UserController {
  constructor(public userRepository: UserRepository) {}

  async getUsers() {
    const users = await this.userRepository.getAllUsers();
    if (!users) {
      throw new NotFoundError("No users found");
    }
    return users;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
  async updateUser(id: string, user: User) {
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
  async deleteUser(id: string) {
    const existingUser = await this.userRepository.getUserById(id);
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    this.userRepository.deleteUser(id);
  }
}
