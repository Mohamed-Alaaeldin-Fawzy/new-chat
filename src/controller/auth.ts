import { User } from "../model/user";
import { UserRepository } from "../repository/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseError } from "../Error/baseError";
import env from "dotenv";
// assigning a secret key
env.config();
const jwtSecret = process.env.JWT_SECRET;

export class AuthController {
  constructor(public userRepository: UserRepository) {}
  async register(user: User) {
    const { name, email, password } = user;
    if (!name || !email || !password) {
      throw new BaseError("Missing required fields", 400);
    }
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new BaseError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    if (!user.id) {
      user.id = Math.ceil(Math.random() * 100).toString();
    }
    return await this.userRepository.createUser(user);
  }
  async login(user: User) {
    const { email, password } = user;
    if (!email || !password) {
      throw new BaseError("Missing required fields", 400);
    }
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (!existingUser) {
      throw new BaseError("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new BaseError("Invalid password", 401);
    }
    const token = jwt.sign({ email }, jwtSecret);
    return { token };
  }
}
