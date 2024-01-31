import { Types } from "mongoose";
import { Message } from "../model/messages";
export class Chat {
  name: string;
  messages: Message[];
  usersIds: Types.ObjectId[] | string[];
  id: string | Types.ObjectId;
  constructor(
    name: string,
    messages: Message[],
    usersIds: Types.ObjectId[] | string[],
    id: string | Types.ObjectId
  ) {
    this.name = name;
    this.messages = messages;
    this.usersIds = usersIds;
    this.id = id;
  }
}
