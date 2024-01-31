import { ChatRepository } from "../chatRepository";
import { Chat } from "../../model/chat";
import { Types } from "mongoose";
const chats: Chat[] = [];
export class InMemoryChatRepository extends ChatRepository {
  async createChat(chat: Chat): Promise<Chat> {
    chats.push(chat);
    return chat;
  }

  async getChats(): Promise<Chat[]> {
    return chats;
  }

  async updateChat(id: string | Types.ObjectId, chat: Chat): Promise<Chat> {
    const chatIndex = chats.findIndex((chat) => chat.id === id);
    if (chatIndex !== -1) {
      chats[chatIndex] = chat;
      return chat;
    }
    return null;
  }
}
