import { UserRepository } from "../repository/user";
import { User } from "../models/user";

export class UserController {
  constructor(public userRepository: UserRepository) {}

  async getUsers(): Promise<Object[]> {
    const users = await this.userRepository.getAllUsers();
    return users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user?.image,
      };
    });
  }

  async getUserById(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.getUserById(id);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user?.image,
    };
  }

  async updateUser(newUser: Partial<User>): Promise<Partial<User>> {
    const updatedUser = await this.userRepository.updateUser(newUser);
    return updatedUser;
  }
}
