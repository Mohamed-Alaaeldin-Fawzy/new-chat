import { ChatRepository } from "../chatRepository";
import { Chat } from "../../model/chat";

export class InMemoryChatRepository extends ChatRepository {
  private chats: Chat[] = [];

  async createChat(chat: Chat): Promise<Chat> {
    this.chats.push(chat);
    return chat;
  }

  async getChatsByUserId(id: string): Promise<Chat[]> {
    const userChats = this.chats.filter((chat) =>
      chat.getUsersIds().includes(id)
    );
    return userChats;
  }

  async updateChat(id: string, chat: Chat): Promise<Chat> {
    const chatIndex = this.chats.findIndex((chat) => chat.getId() === id);
    if (chatIndex !== -1) {
      this.chats[chatIndex] = chat;
      return chat;
    }
    return null;
  }
  async getChatById(id: string): Promise<Chat> {
    return this.chats.find((chat) => chat.getId() === id);
  }
}
