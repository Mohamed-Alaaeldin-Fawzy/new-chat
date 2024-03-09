import { UserRepository } from "../user";
import { User as UserSchema } from "./mongooseSchema/User";
import { User } from "../../models/user";

export class MongoUserRepository extends UserRepository {
  async createUser(user: User): Promise<User> {
    const newUser = new UserSchema({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    await newUser.save();

    return new User({
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });
  }

  async getAllUsers(): Promise<Partial<User[]>> {
    const users = await UserSchema.find();
    return users.map((user) => {
      return new User({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
      });
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await UserSchema.findById(id);
    return new User({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await UserSchema.findOne({ email });
    if (user !== null && user !== undefined) {
      return new User({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  }
}
