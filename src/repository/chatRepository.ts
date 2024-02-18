import { Chat } from "../models/chat";

export abstract class ChatRepository {
  abstract createChat(chat: Chat): Promise<Chat>;

  abstract getChatsByUserId(id: string): Promise<Chat[]>;

  abstract updateChat(id: string, chat: Chat): Promise<Chat>;

  abstract getChatById(id: string): Promise<Chat>;
}
