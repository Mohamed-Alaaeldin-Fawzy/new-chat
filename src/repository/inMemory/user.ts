import { UserRepository } from "../userRepository";
import { User } from "../../models/user";
import { generateRandomNumber } from "../../util/getRandomNumber";
import { NotFoundError } from "../../Error/notFoundError";

export class InMemoryUserRepository extends UserRepository {
  private users: User[] = [];

  async getAllUsers(): Promise<Object[]> {
    const users = this.users.map((user) => {
      return {
        name: user.getName(),
        email: user.getEmail(),
        id: user.getId(),
      };
    });
    return users;
  }

  async getUserById(id: string): Promise<Object> {
    const user = this.users.find((user) => user.getId() === id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return {
      name: user.getName(),
      email: user.getEmail(),
      id: user.getId(),
    };
  }

  async createUser(user: User): Promise<Object> {
    console.log("creating user", user);
    if (!user.getId()) {
      user.setId(generateRandomNumber(10));
    }
    this.users.push(user);
    return {
      name: user.getName(),
      email: user.getEmail(),
      id: user.getId(),
    };
  }

  async updateUser(id: string, updatedUser: Partial<User>): Promise<Object> {
    // Find the user based on the provided ID
    const userToUpdate = this.users.find((user) => user.getId() === id);

    // If the user is not found, return null
    if (!userToUpdate) {
      throw new NotFoundError("User not found");
    }

    // Update the user properties with the provided values
    if (updatedUser.getName() !== undefined) {
      userToUpdate.setName(updatedUser.getName());
    }
    if (updatedUser.getEmail() !== undefined) {
      userToUpdate.setEmail(updatedUser.getEmail());
    }
    if (updatedUser.getPassword() !== undefined) {
      userToUpdate.setPassword(updatedUser.getPassword());
    }

    // Return the updated user
    return {
      name: userToUpdate.getName(),
      email: userToUpdate.getEmail(),
      id: userToUpdate.getId(),
    };
  }

  async getUserByEmail(email: string): Promise<Object> {
    const user = this.users.find((u) => u.getEmail() === email);
    return {
      name: user?.getName(),
      email: user?.getEmail(),
      id: user?.getId(),
    };
  }

  async deleteUser(id: string): Promise<void> {
    const newUsers = this.users.filter((u) => u.getId() !== id);
    if (newUsers.length === this.users.length) {
      throw new NotFoundError("User not found");
    }
    this.users = newUsers;
  }
}
