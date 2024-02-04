import { UserRepository } from "../userRepository";
import { User } from "../../model/user";

export class InMemoryUserRepository extends UserRepository {
  private users: User[] = [];

  async getAllUsers(): Promise<Object[]> {
    const users = this.users.map((user) => {
      return {
        name: user.getName(),
        email: user.getEmail(),
      };
    });
    return users;
  }

  async getUserById(id: string): Promise<User> {
    return this.users.find((user) => user.getId() === id);
  }

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async updateUser(id: string, updatedUser: Partial<User>): Promise<User> {
    // Find the user based on the provided ID
    const userToUpdate = this.users.find((user) => user.getId() === id);

    // If the user is not found, return null
    if (!userToUpdate) {
      return null;
    }

    // Update the user properties with the provided values
    if (updatedUser.getName() !== undefined) {
      userToUpdate.setName(updatedUser.getName());
    }
    if (updatedUser.getEmail() !== undefined) {
      userToUpdate.setEmail(updatedUser.getEmail());
    }
    if (updatedUser.getPassword() !== undefined) {
      userToUpdate.setPassword(updatedUser.getPassword());
    }

    // Return the updated user
    return userToUpdate;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = this.users.find((u) => u.getEmail() === email);
    return user;
  }
  async deleteUser(id: string): Promise<void> {
    const newUsers = this.users.filter((u) => u.getId() !== id);
    this.users = newUsers;
  }
}
