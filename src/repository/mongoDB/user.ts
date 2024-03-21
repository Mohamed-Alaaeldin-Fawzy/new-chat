import { UserRepository } from "../user";
import { User as UserSchema } from "./mongooseSchema/User";
import { User } from "../../models/user";
import { DatabaseError } from "../../Error/DatabaseError";
import { NotFoundError } from "../../Error/notFoundError";

export class MongoUserRepository extends UserRepository {
  async createUser({ name, email, password }: User): Promise<User> {
    try {
      const newUser = new UserSchema({
        name,
        email,
        password,
      });

      await newUser.save();

      return new User({
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        image: newUser?.image,
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getAllUsers(): Promise<Partial<User[]>> {
    try {
      const users = await UserSchema.find();
      return users.map(
        (user) =>
          new User({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user?.image,
          })
      );
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await UserSchema.findById(id);
      if (!user) throw new Error("User not found");
      return new User({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user?.image,
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserSchema.findOne({ email });
      if (!user) return null;
      return new User({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        image: user?.image,
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async updateUser(updatedUser: Partial<User>): Promise<User> {
    try {
      const { id, ...update } = updatedUser;
      const user = await UserSchema.findByIdAndUpdate(id, update, {
        new: true,
      });
      if (!user) throw new NotFoundError("User not found");
      return new User({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        image: user?.image,
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
