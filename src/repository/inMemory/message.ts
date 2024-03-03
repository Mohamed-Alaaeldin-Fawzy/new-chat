import { MessageRepository } from "../messageRepository";
import { Message } from "../../models/messages";
import { generateRandomNumber } from "../../util/getRandomNumber";
import { NotFoundError } from "../../Error/notFoundError";
export class InMemoryMessageRepository extends MessageRepository {
  private messages: Message[] = [];
  async getMessagesByChatId(chatId: string): Promise<Message[]> {
    const messages = this.messages.filter(
      (message) => message.getChatId() === chatId
    );
    return messages;
  }

  async createMessage(message: Message): Promise<Message> {
    message.setId(generateRandomNumber(10));
    this.messages.push(message);
    return message;
  }

  async deleteMessage(id: string): Promise<void> {
    const newMessages = this.messages.filter(
      (message) => message.getId() !== id
    );
    if (newMessages.length === this.messages.length) {
      throw new NotFoundError("Message not found");
    }
    this.messages = newMessages;
  }

  async getMessageById(id: string): Promise<Message> {
    const message = this.messages.find((message) => message.getId() === id);
    if (!message) {
      throw new NotFoundError("Message not found");
    }
    return message;
  }
}
