import { UserRepository } from "../userRepository";
import { UserType } from "../types";
export class InMemoryUser extends UserRepository {
  private users: UserType[] = [];
  constructor(user: UserType) {
    super(user);
  }

  register(): UserType {
    try {
      const user: UserType = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      };
      this.users.push(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  delete(): void {
    this.users = this.users.filter((user) => user.email !== this.user.email);
  }

  login(): UserType {
    try {
      const user = this.users.find((user) => user.email === this.user.email);
      if (this.user.password !== user?.password) {
        throw new Error("Invalid credentials");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
