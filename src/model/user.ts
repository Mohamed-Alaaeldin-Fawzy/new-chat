import { MongoUser } from "../repository/mongoDB/mongoUser";
import { InMemoryUser } from "../repository/inMemory/inMemoryUser"; /* Incase you wanted to change the DB all you need to do is import it and change one line */
import { UserType } from "../repository/types";

export class User {
  private userRepository;
  constructor(user: UserType) {
    this.userRepository = new MongoUser(
      user as UserType
    ); /* Incase you wanted to change the DB all you need to do change this line*/
  }
  async register() {
    return await this.userRepository.register();
  }
  login() {
    return this.userRepository.login();
  }
  delete() {
    return this.userRepository.delete();
  }
}
