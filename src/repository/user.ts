import { User } from "../models/user";

export abstract class UserRepository {
  abstract getAllUsers(): Promise<Partial<User[]>>;

  abstract getUserById(id: string): Promise<Partial<User>>;

  abstract createUser(user: User): Promise<Partial<User>>;

  abstract getUserByEmail(email: string): Promise<Partial<User>>;
}
