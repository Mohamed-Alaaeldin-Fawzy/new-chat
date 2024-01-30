import { User as UserModel } from "../model/user";

export abstract class UserRepository {
  // [users] : UserRepository[]

  protected users: UserModel[] = [];

  abstract getAllUsers(): UserModel[] | Promise<any[]>;

  abstract getUserById(id: string): UserModel | Promise<any>;

  abstract createUser(user: UserModel): UserModel | Promise<any>;

  abstract updateUser(id: string, newUser: UserModel): UserModel | Promise<any>;

  abstract getUserByEmailAndPassword(
    email: string,
    password: string
  ): UserModel | Promise<any>;

  abstract deleteUser(id: string): void;
}

// ! UserRepository(Model(Controller(Route)))
// root instance of cotroller(repo)
