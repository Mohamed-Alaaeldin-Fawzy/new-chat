import { UserRepository } from "../userRepository";
import { User as UserModel } from "../../model/user";
export class User extends UserRepository {
  getAllUsers(): UserModel[] | Promise<UserModel[]> {
    return this.users;
  }

  getUserById(id: string): UserModel | Promise<UserModel> {
    return this.users.find((user) => user.getId() === id);
  }

  createUser(user: UserModel): UserModel | Promise<UserModel> {
    this.users.push(user);
    return user;
  }

  updateUser(id: string, newUser: UserModel): UserModel | Promise<UserModel> {
    const newUsers = this.users.map((u) => {
      if (u.getId() === id) {
        return newUser;
      }
      return u;
    });
    this.users = newUsers;
    return newUser;
  }

  getUserByEmailAndPassword(
    email: string,
    password: string
  ): UserModel | Promise<UserModel> {
    const user = this.users.find((u) => u.getEmail() === email);
    if ((user && user.getPassword()) === password) {
      return user;
    }
  }
  deleteUser(id: string): void | Promise<void> {
    const newUsers = this.users.filter((u) => u.getId() !== id);
    this.users = newUsers;
  }
}
