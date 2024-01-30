import { ChatRepository } from "repository/chatRepository";
import { ObjectId, Types } from "mongoose";
import { Chat } from "./mongooseSchema/Chat";
import { User } from "./mongooseSchema/User";

export class MongoChat extends ChatRepository {
  constructor(name: string, body: string, usersIds: Types.ObjectId[]) {
    super(name, body, usersIds);
  }

  public async getMessages(): Promise<any> {
    try {
      const messages = await Chat.find({ usersIds: { $in: this.usersIds } });
      return messages;
    } catch (error) {
      throw error;
    }
  }

  public async sendMessages() {
    try {
      const newChat = new Chat({
        name: this.name,
        body: this.body,
        usersIds: this.usersIds,
      });
      await newChat.save();
    } catch (error) {
      throw error;
    }
  }

  public async getUsers(): Promise<Types.ObjectId[]> {
    try {
      const users = await User.find({ _id: { $in: this.usersIds } });
      const usersIds = users.map((user) => user._id);
      return usersIds;
    } catch (error) {
      throw error;
    }
  }
}
