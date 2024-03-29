import { User } from "../model/user";

export abstract class UserRepository {
  abstract getAllUsers(): Object[] | Promise<Object[]>;

  abstract getUserById(id: string): Promise<User>;

  abstract createUser(user: User): Promise<User>;

  abstract updateUser(id: string, newUser: Partial<User>): Promise<User>;

  abstract getUserByEmail(email: string): Promise<User>;

  abstract deleteUser(id: string): void;
}
