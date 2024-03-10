import { ChatRepository } from "../chat";
import { Chat } from "../../models/chat";
import { generateRandomNumber } from "../../util/getRandomNumber";
import { NotFoundError } from "../../Error/notFoundError";

export class InMemoryChatRepository extends ChatRepository {
  private chats: Chat[] = [];

  async createChat(chat: Chat): Promise<Chat> {
    if (!chat.id) {
      chat.id = generateRandomNumber(10);
    }
    this.chats.push(chat);
    return chat;
  }

  async getChatsByUserId(id: string): Promise<Chat[]> {
    const userChats = this.chats.filter((chat) => chat.usersIds.includes(id));
    return userChats;
  }

  async getChatById(id: string): Promise<Chat> {
    const chat = this.chats.find((chat) => chat.id === id);
    if (!chat) {
      throw new NotFoundError("Chat not found");
    }
    return chat;
  }
}
