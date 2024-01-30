import { UserType } from "./types";
export abstract class UserRepository {
  protected user: UserType;

  constructor(user: UserType) {
    this.user = user;
  }

  // Abstract methods that must be implemented by subclasses
  abstract register(user: UserType): UserType | Promise<UserType>;
  abstract login(): UserType | Promise<UserType>;
  abstract delete(): void;
  // getUsers (): UserType[] | Promise<UserType[]>
}

// UserRepository(Model(Controller(Route)))
