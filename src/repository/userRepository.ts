import { User as UserModel } from "../model/user";

export abstract class UserRepository {
  abstract getAllUsers(): UserModel[] | Promise<any[]>;

  abstract getUserById(id: string): Promise<UserModel>;

  abstract createUser(user: UserModel): Promise<UserModel>;

  abstract updateUser(id: string, newUser: UserModel): Promise<UserModel>;

  abstract getUserByEmail(email: string): Promise<UserModel>;

  abstract deleteUser(id: string): void;
}
