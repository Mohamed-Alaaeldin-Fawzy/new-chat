import { User } from "../models/user";

export abstract class UserRepository {
  abstract getAllUsers(): Promise<Object[]>;

  abstract getUserById(id: string): Promise<Object>;

  abstract createUser(user: User): Promise<Partial<User>>;

  abstract updateUser(
    id: string,
    newUser: Partial<User>
  ): Promise<Partial<User>>;

  abstract getUserByEmail(email: string): Promise<Object>;

  abstract deleteUser(id: string): void;
}
