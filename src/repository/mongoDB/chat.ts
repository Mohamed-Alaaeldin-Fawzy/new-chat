import { ChatRepository } from "../chat";
import { Chat as ChatSchema } from "./mongooseSchema/Chat";
import { Chat } from "../../models/chat";
import { DatabaseError } from "Error/DatabaseError";

export class MongoChatRepository extends ChatRepository {
  async createChat(chat: Chat): Promise<Chat> {
    try {
      const newChat = new ChatSchema({
        name: chat.name,
        usersIds: chat.usersIds,
      });
      await newChat.save();
      return new Chat({
        id: newChat._id.toString(),
        name: newChat.name,
        usersIds: newChat.usersIds.map((userId) => userId.toString()),
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getChatsByUserId(id: string): Promise<Chat[]> {
    try {
      const chats = await ChatSchema.find({ usersIds: id });
      return chats.map(
        (chat) =>
          new Chat({
            id: chat._id.toString(),
            name: chat.name,
            usersIds: chat.usersIds.map((userId) => userId.toString()),
          })
      );
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getChatById(id: string): Promise<Chat> {
    try {
      const chat = await ChatSchema.findById(id);
      if (!chat) {
        throw new Error("Chat not found");
      }
      return new Chat({
        id: chat._id.toString(),
        name: chat.name,
        usersIds: chat.usersIds.map((userId) => userId.toString()),
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
