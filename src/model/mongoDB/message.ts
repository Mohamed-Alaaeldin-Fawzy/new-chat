import { Types } from "mongoose";
import { Message } from "../messages";

export class MongoMessage extends Message {
  _id?: Types.ObjectId;
  constructor({
    chatId,
    body,
    senderId,
  }: {
    chatId: string;
    body: string;
    senderId: string;
  }) {
    super({
      chatId,
      body,
      senderId,
    });
  }
}
