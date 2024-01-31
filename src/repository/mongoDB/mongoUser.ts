import { UserRepository } from "../userRepository";
import { User as UserSchema } from "./mongooseSchema/User";
import { ObjectId } from "mongoose";
import { User as UserModel } from "../../model/user";
import mongoose from "mongoose";

const connect = async () => {
  mongoose.Promise = Promise;

  mongoose.connect(process.env.MONGO_URL as string);

  mongoose.connection.on("error", (error) => {
    console.log(error);
  });
};

export class MongoUser extends UserRepository {
  constructor() {
    super();
    connect();
  }
  async createUser(user: UserModel) {
    const newUser = new UserSchema(user);
    await newUser.save();
    return user;
  }

  async getAllUsers() {
    const users = await UserSchema.find();
    return users;
  }

  async getUserById(id: string): Promise<UserModel> {
    return await UserSchema.findById(id);
  }

  async updateUser(id: string, newUser: UserModel): Promise<UserModel> {
    return await UserSchema.findByIdAndUpdate(id, newUser, { new: true });
  }

  async getUserByEmailAndHashedPassword(
    email: string,
    hashedPassword: string
  ): Promise<UserModel> {
    return await UserSchema.findOne({ email, hashedPassword });
  }

  async deleteUser(id: string): Promise<void> {
    await UserSchema.findByIdAndDelete(id);
  }
}
