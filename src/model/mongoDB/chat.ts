import { Types } from "mongoose";
import { Chat } from "../chat";

export class MongoChat extends Chat {
  _id?: Types.ObjectId;
  constructor({ name, usersIds }: { name?: string; usersIds?: string[] }) {
    super({
      name,
      usersIds,
    });
  }
}
