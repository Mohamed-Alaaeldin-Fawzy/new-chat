import { User as UserModel } from "../model/user";

export abstract class UserRepository {
  abstract getAllUsers(): UserModel[] | Promise<any[]>;

  abstract getUserById(id: string): UserModel | Promise<UserModel>;

  abstract createUser(user: UserModel): UserModel | Promise<UserModel>;

  abstract updateUser(
    id: string,
    newUser: UserModel
  ): UserModel | Promise<UserModel>;

  abstract getUserByEmailAndPassword(
    email: string,
    password: string
  ): UserModel | Promise<UserModel>;

  abstract deleteUser(id: string): void;
}
