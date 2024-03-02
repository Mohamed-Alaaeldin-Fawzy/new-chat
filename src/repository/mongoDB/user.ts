import { UserRepository } from "../userRepository";
import { User as UserSchema } from "./mongooseSchema/User";
import { User } from "../../models/user";

export class MongoUserRepository extends UserRepository {
  async createUser(user: User) {
    const newUser = new UserSchema(user);
    await newUser.save();
    return user;
  }

  async getAllUsers() {
    const users = await UserSchema.find();
    return users;
  }

  async getUserById(id: string): Promise<User> {
    return await UserSchema.findById(id);
  }

  async updateUser(id: string, newUser: Partial<User>): Promise<User> {
    const user = await UserSchema.findByIdAndUpdate(id, newUser, { new: true });
    const transformedUser = new User(user);
    return transformedUser;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await UserSchema.findOne({ email });
  }

  async deleteUser(id: string): Promise<void> {
    await UserSchema.findByIdAndDelete(id);
  }
}
