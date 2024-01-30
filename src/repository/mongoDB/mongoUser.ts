// import { UserRepository } from "../userRepository";
// import { User as UserSchema } from "./mongooseSchema/User";
// import { ObjectId } from "mongoose";
// import { User as UserModel } from "../../model/user";

// export class MongoUser extends UserRepository {
//   async createUser(user: UserModel) {
//     const newUser = new UserSchema(user);
//     await newUser.save();
//     return user;
//   }

//   async getAllUsers() {
//     const users = await UserSchema.find();
//     return users;
//   }

//   async getUserById(id: string) {
//     const user = await UserSchema.findById(id);
//     return user;
//   }

//   async getUserByEmailAndPassword(email: string, password: string) {
//     const user = await UserSchema.findOne({ email });
//     if (user && user.password === password) {
//       return user;
//     }
//   }

//   async updateUser(id: string, newUser: UserModel) {
//     const updatedUser = await UserSchema.findByIdAndUpdate(
//       id,
//       {
//         name: newUser.getName(),
//         email: newUser.getEmail(),
//         password: newUser.getPassword(),
//       },
//       {
//         new: true,
//       }
//     );
//     return updatedUser;
//   }

//   async deleteUser(id: string) {
//     await UserSchema.findByIdAndDelete(id);
//   }
// }
