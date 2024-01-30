import { ObjectId } from "mongoose";
import { ChatRepository } from "repository/chatRepository";

export class InMemoryChat extends ChatRepository {
  private messages: object[] = [];
  private users: ObjectId[] = [];
  constructor(name: string, body: string, usersIds: ObjectId[]) {
    super(name, body, usersIds);
  }
  getMessages(): object[] {
    return this.messages;
  }
  getUsers(): ObjectId[] {
    return this.users;
  }
  sendMessages(): void {
    this.messages.push({
      name: this.name,
      body: this.body,
      usersIds: this.usersIds,
    });
  }
}
