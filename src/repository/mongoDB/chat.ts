import { ChatRepository } from "../chat";
import { Chat as ChatSchema } from "./mongooseSchema/Chat";
import { Chat } from "../../models/chat";

export class MongoChatRepository extends ChatRepository {
  async createChat(chat: Chat): Promise<Chat> {
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
  }

  async getChatsByUserId(id: string): Promise<Chat[]> {
    const chats = await ChatSchema.find({ usersIds: id });
    return chats.map((chat) => {
      return new Chat({
        id: chat._id.toString(),
        name: chat.name,
        usersIds: chat.usersIds.map((userId) => userId.toString()),
      });
    });
  }

  async updateChat(id: string, chat: Chat): Promise<Chat> {
    const updatingValues = {
      _id: chat.id,
      name: chat.name,
      usersIds: chat.usersIds,
    };
    const updatedChat = await ChatSchema.findByIdAndUpdate(id, updatingValues, {
      new: true,
    });
    const transformedChat = new Chat({
      id: updatedChat._id.toString(),
      name: updatedChat.name,
      usersIds: updatedChat.usersIds.map((userId) => userId.toString()),
    });
    return transformedChat;
  }

  async getChatById(id: string): Promise<Chat> {
    const chat = await ChatSchema.findById(id);
    const transformedChat = new Chat({
      id: chat._id.toString(),
      name: chat.name,
      usersIds: chat.usersIds.map((userId) => userId.toString()),
    });
    return transformedChat;
  }
}
