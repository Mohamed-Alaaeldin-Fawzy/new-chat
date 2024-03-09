import { Message } from "../models/messages";

export abstract class MessageRepository {
  abstract createMessage(message: Message): Promise<Message>;

  abstract getMessagesByChatId(chatId: string): Promise<Message[]>;

  abstract deleteMessage(id: string): Promise<void>;

  abstract getMessageById(id: string): Promise<Message>;
}
