import { UserRepository } from "../userRepository";
import { User as UserModel } from "../../model/user";

let users: UserModel[] = [];

export class User extends UserRepository {
  async getAllUsers(): Promise<UserModel[]> {
    return users;
  }

  async getUserById(id: string): Promise<UserModel> {
    return users.find((user) => user.id === id);
  }

  async createUser(user: UserModel): Promise<UserModel> {
    users.push(user);
    return user;
  }

  async updateUser(
    id: string,
    newUser: Partial<UserModel>
  ): Promise<UserModel> {
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      const updatedUser = { ...users[userIndex], ...newUser };
      users[userIndex] = updatedUser;
      return updatedUser;
    }

    return null;
  }

  async getUserByEmailAndHashedPassword(
    email: string,
    hashedPassword: string
  ): Promise<UserModel> {
    const user = users.find((u) => u.email === email);
    if (user && user.password === hashedPassword) {
      return user;
    }
  }
  async deleteUser(id: string): Promise<void> {
    {
      const newUsers = users.filter((u) => u.id !== id);
      users = newUsers;
    }
  }
}
