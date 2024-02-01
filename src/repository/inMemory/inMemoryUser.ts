import { UserRepository } from "../userRepository";
import { User as UserModel } from "../../model/user";

export class User extends UserRepository {
  private users: UserModel[] = [];

  async getAllUsers(): Promise<UserModel[]> {
    const usersToBeReturned = this.users.map((user) => {
      return { name: user.name, email: user.email };
    });
    return usersToBeReturned;
  }

  async getUserById(id: string): Promise<UserModel> {
    return this.users.find((user) => user.id === id);
  }

  async createUser(user: UserModel): Promise<UserModel> {
    this.users.push(user);
    return user;
  }

  async updateUser(
    id: string,
    newUser: Partial<UserModel>
  ): Promise<UserModel> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const updatedUser = { ...this.users[userIndex], ...newUser };
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }

    return null;
  }

  async getUserByEmail(email: string): Promise<UserModel> {
    const user = this.users.find((u) => u.email === email);
    return user;
  }
  async deleteUser(id: string): Promise<void> {
    {
      const newUsers = this.users.filter((u) => u.id !== id);
      this.users = newUsers;
    }
  }
}
