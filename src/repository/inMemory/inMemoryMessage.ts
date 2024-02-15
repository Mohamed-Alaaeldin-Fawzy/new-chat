import { MessageRepository } from "../messageRepository";
import { Message } from "../../model/messages";
export class InMemoryMessageRepository extends MessageRepository {
  private messages: Message[] = [];
  async getMessagesByChatId(chatId: string): Promise<Message[]> {
    const messages = this.messages.filter(
      (message) => message.getChatId() === chatId
    );
    return messages;
  }

  async createMessage(message: Message): Promise<Message> {
    this.messages.push(message);
    return message;
  }

  async deleteMessage(id: string): Promise<void> {
    const newMessages = this.messages.filter(
      (message) => message.getId() !== id
    );
    this.messages = newMessages;
  }
  async getMessageById(id: string): Promise<Message> {
    return this.messages.find((message) => message.getId() === id);
  }
}
