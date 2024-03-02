import { ChatRepository } from "repository/chatRepository";
import { Chat as ChatSchema } from "./mongooseSchema/Chat";
import { Chat } from "../../models/chat";

export class MongoChatRepository extends ChatRepository {
  async createChat(chat: Chat): Promise<Chat> {
    const newChat = new ChatSchema(chat);
    await newChat.save();
    return chat;
  }

  async getChatsByUserId(id: string): Promise<Chat[]> {
    const chats = await ChatSchema.find({ id });
    const transformedChats: Chat[] = chats.map((chat) => {
      return new Chat({
        id: chat._id.toString(),
        name: chat.name,
        usersIds: chat.usersIds.map((userId) => userId.toString()),
      });
    });
    return transformedChats;
  }

  async updateChat(id: string, chat: Chat): Promise<Chat> {
    const updatingValues = {
      _id: chat.getId(),
      name: chat.getName(),
      usersIds: chat.getUsersIds(),
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
