import { UserRepository } from "../repository/userRepository";
import { User } from "../model/user";

// ?? this Class is to make all the javascript pure logic unrelated to DB or Routes

export class UserController {
  constructor(public userRepository: UserRepository) {}
  async register(user: User) {
    return await this.userRepository.createUser(user);
  }
  async login(email: string, password: string) {
    return await this.userRepository.getUserByEmailAndPassword(email, password);
  }
  async getUsers() {
    return await this.userRepository.getAllUsers();
  }
  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }
  async updateUser(id: string, user: User) {
    return await this.userRepository.updateUser(id, user);
  }
  async deleteUser(id: string) {
    this.userRepository.deleteUser(id);
  }
}
