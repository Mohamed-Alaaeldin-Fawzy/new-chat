import { UserRepository } from "../userRepository";
import { UserRepositoryType, UserType } from "../types";
import { User as UserSchema } from "./mongooseSchema/User";
import { ObjectId } from "mongodb";

interface MongooseUserType extends UserRepositoryType {
  _id: ObjectId;
}

export class MongoUser extends UserRepository {
  constructor(user: UserType) {
    super(user);
    this.user = user;
  }
  public async register(): Promise<MongooseUserType> {
    try {
      const newUser = new UserSchema({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      });
      await newUser.save();
      return newUser.toJSON();
    } catch (error) {
      throw error;
    }
  }

  public async login(): Promise<MongooseUserType> {
    try {
      const user = await UserSchema.findOne({
        email: this.user.email,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public delete(): void {
    UserSchema.deleteOne({ email: this.user.email });
  }
}
