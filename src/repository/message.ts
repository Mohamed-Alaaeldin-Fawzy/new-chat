import { Message } from "../models/messages";

export abstract class MessageRepository {
  abstract createMessage(message: Partial<Message>): Promise<Partial<Message>>;

  abstract getMessagesByChatId(chatId: string): Promise<Message[]>;

  abstract deleteMessage(id: string): Promise<void>;

  abstract getMessageById(id: string): Promise<Message>;
}
