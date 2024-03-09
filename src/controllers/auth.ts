import { User } from "../models/user";
import { UserRepository } from "../repository/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BaseError } from "../Error/baseError";
import { NotFoundError } from "../Error/notFoundError";
import { BadRequestError } from "../Error/badRequestError";
import dotenv from "dotenv";
import { loginSchema, registerSchema } from "../validation/auth";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export class AuthController {
  constructor(public userRepository: UserRepository) {}
  async register(user: User): Promise<Partial<User>> {
    const registerError = registerSchema.validate({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    if (registerError.error) {
      throw new BadRequestError(registerError.error.message);
    }
    const existingUser = await this.userRepository.getUserByEmail(user.email);
    if (existingUser) {
      throw new BaseError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return await this.userRepository.createUser(user);
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{
    token: string;
    user: Partial<User>;
  }> {
    const loginError = loginSchema.validate({ email, password });
    if (loginError.error) {
      throw new BadRequestError(loginError.error.message);
    }

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (!existingUser) {
      throw new NotFoundError("User not found");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new BaseError("Invalid password", 401);
    }
    const user = await this.userRepository.getUserByEmail(email);
    const token = jwt.sign({ email, id: existingUser.id }, jwtSecret);
    return { token, user };
  }
}
