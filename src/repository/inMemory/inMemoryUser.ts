import { UserRepository } from "../userRepository";
import { User as UserModel } from "../../model/user";

let users: UserModel[] = [];

export class User extends UserRepository {
  async getAllUsers(): Promise<UserModel[]> {
    return await users;
  }

  async getUserById(id: string): Promise<UserModel> {
    return await users.find((user) => user.getId() === id);
  }

  async createUser(user: UserModel): Promise<UserModel> {
    users.push(user);
    console.log(users);
    return await user;
  }

  async updateUser(id: string, newUser: UserModel): Promise<UserModel> {
    const newUsers = users.map((u) => {
      if (u.getId() === id) {
        return newUser;
      }
      return u;
    });
    users = newUsers;
    return await newUser;
  }

  async getUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserModel> {
    const user = users.find((u) => u.getEmail() === email);
    if ((user && user.getPassword()) === password) {
      return await user;
    }
  }
  async deleteUser(id: string): Promise<void> {
    {
      const newUsers = users.filter((u) => u.getId() !== id);
      users = newUsers;
    }
  }
}
