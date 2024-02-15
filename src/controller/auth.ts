import { User } from "../model/user";
import { UserRepository } from "../repository/userRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseError } from "../Error/baseError";
import { generateRandomNumber } from "../util/getRandomNumber";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export class AuthController {
  constructor(public userRepository: UserRepository) {}
  async register(user: User) {
    if (!user.getName() || !user.getEmail() || !user.getPassword()) {
      throw new BaseError("Missing required fields", 400);
    }
    const existingUser = await this.userRepository.getUserByEmail(
      user.getEmail()
    );
    if (existingUser) {
      throw new BaseError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(user.getPassword(), 10);
    user.setPassword(hashedPassword);
    user.setId(generateRandomNumber(10));
    return await this.userRepository.createUser(user);
  }

  async login({ email, password }: { email: string; password: string }) {
    if (!email || !password) {
      throw new BaseError("Missing required fields", 400);
    }
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (!existingUser) {
      throw new BaseError("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.getPassword()
    );
    if (!isPasswordValid) {
      throw new BaseError("Invalid password", 401);
    }
    const token = jwt.sign({ email, id: existingUser.getId() }, jwtSecret);
    return { token };
  }
}
