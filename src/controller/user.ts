import { UserType } from "repository/types";
import { User } from "../model/user";

// ?? this Class is to make all the javascript pure logic unrelated to DB or Routes

export class UserController {
  async register(name: string, email: string, password: string) {
    const newUser = new User({
      name,
      email,
      password,
    });
    return await newUser.register();
  }

  login(email: string, password: string) {
    return new User({ email, password }).login();
  }
  delete(user: UserType) {
    return new User(user).delete();
  }
}
