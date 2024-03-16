import { UserRepository } from "../user";
import { User } from "../../models/user";
import { generateRandomNumber } from "../../util/getRandomNumber";
import { NotFoundError } from "../../Error/notFoundError";

export class InMemoryUserRepository extends UserRepository {
  private users: Partial<User[]> = [];

  async getAllUsers(): Promise<User[]> {
    const users = this.users.map(
      (user) =>
        new User({
          name: user.name,
          email: user.email,
          id: user.id,
        })
    );
    return users;
  }

  async getUserById(id: string): Promise<Partial<User>> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return {
      name: user.name,
      email: user.email,
      id: user.id,
    };
  }

  async createUser(user: User): Promise<Object> {
    if (!user.id) {
      user.id = generateRandomNumber(10);
    }
    this.users.push(user);
    return {
      name: user.name,
      email: user.email,
      id: user.id,
    };
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = this.users.find((u) => u.email === email);
    return user;
  }

  async updateUser(updatedUser: Partial<User>): Promise<Partial<User>> {
    const userToUpdateIndex = this.users.findIndex(
      (user) => user.id === updatedUser.id
    );
    if (userToUpdateIndex === -1) {
      throw new NotFoundError("User not found");
    }

    const userToUpdate = this.users[userToUpdateIndex];
    const updatedUserData = {
      ...userToUpdate,
      ...updatedUser,
    };

    // @ts-ignore
    this.users[userToUpdateIndex] = updatedUserData;

    return updatedUserData;
  }
}
