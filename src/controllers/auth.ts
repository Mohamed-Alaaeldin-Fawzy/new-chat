import { User } from "../models/user";
import { UserRepository } from "../repository/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NotFoundError } from "../Error/notFoundError";
import { BadRequestError } from "../Error/badRequestError";
import { jwtSecret } from "../constants";
import { loginSchema, registerSchema } from "../validation/auth";
import { validate } from "../util/validate";

interface AuthReturnType {
  token: string;
  user: Partial<User>;
}

export class AuthController {
  constructor(public userRepository: UserRepository) {}

  async register(user: User): Promise<AuthReturnType> {
    const { name, email, password } = user;
    validate(registerSchema, { name, email, password }, BadRequestError);

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email, id: newUser.id }, jwtSecret);

    return { token, user: newUser };
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthReturnType> {
    validate(loginSchema, { email, password }, BadRequestError);

    const existingUser = await this.userRepository.getUserByEmail(email);
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new BadRequestError("Invalid password");
    }

    const token = jwt.sign({ email, id: existingUser.id }, jwtSecret);

    return { token, user: existingUser };
  }
}
