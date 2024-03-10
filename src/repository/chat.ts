import { Chat } from "../models/chat";

export abstract class ChatRepository {
  abstract createChat(chat: Partial<Chat>): Promise<Chat>;

  abstract getChatsByUserId(id: string): Promise<Chat[]>;

  abstract getChatById(id: string): Promise<Chat>;
}
