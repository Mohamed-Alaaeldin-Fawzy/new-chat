import { Message } from "../model/messages";

export abstract class MessageRepository {
  abstract createMessage(message: Message): Promise<Message>;
  abstract getMessages(): Promise<Message[]>;
  abstract deleteMessage(id: string): Promise<void>;
}
