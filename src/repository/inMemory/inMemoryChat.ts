import { ChatRepository } from "../chatRepository";
import { Chat } from "../../model/chat";
import { Types } from "mongoose";
export class InMemoryChatRepository extends ChatRepository {
  private chats: Chat[] = [];

  async createChat(chat: Chat): Promise<Chat> {
    this.chats.push(chat);
    return chat;
  }

  async getChats(): Promise<Chat[]> {
    return this.chats;
  }

  async updateChat(id: string | Types.ObjectId, chat: Chat): Promise<Chat> {
    const chatIndex = this.chats.findIndex((chat) => chat.id === id);
    if (chatIndex !== -1) {
      this.chats[chatIndex] = chat;
      return chat;
    }
    return null;
  }
}
