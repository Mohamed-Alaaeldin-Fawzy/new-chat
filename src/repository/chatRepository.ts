import { Types } from "mongoose";

export abstract class ChatRepository {
  protected name: string;
  protected usersIds: Types.ObjectId[];
  protected body: string;

  constructor(name: string, body: string, usersIds: Types.ObjectId[]) {
    this.name = name;
    this.usersIds = usersIds;
    this.body = body;
  }

  abstract createChat(): object[] | Promise<any>;
  abstract getChats(): object[] | Promise<any>;
  abstract updateChat(): void;
  abstract deleteChat(): void;
}
