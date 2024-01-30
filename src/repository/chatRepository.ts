import { ObjectId } from "mongoose";

export abstract class ChatRepository {
  protected name: string;
  protected usersIds: ObjectId[];
  protected body: string;

  constructor(name: string, body: string, usersIds: ObjectId[]) {
    this.name = name;
    this.usersIds = usersIds;
    this.body = body;
  }

  abstract getMessages(): object[];
  abstract sendMessages(): void;
  abstract getUsers(): ObjectId[];
}
