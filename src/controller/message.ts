import { Message } from "../model/messages";
import { MessageRepository } from "../repository/messageRepository";
import { NotFoundError } from "../Error/notFoundError";
import { BadRequestError } from "../Error/badRequestError";

export class MessageController {
  constructor(public messageRepository: MessageRepository) {}

  async createMessage(message: Message) {
    if (!message) {
      throw new BadRequestError("Please provide a message");
    }
    const NewMessage = this.messageRepository.createMessage(message);
    if (!NewMessage) {
      throw new BadRequestError("Error while creating message");
    }
    return NewMessage;
  }

  async getMessagesByChatId(chatId: string) {
    if (!chatId) {
      throw new BadRequestError("Please provide a chatId");
    }
    const messages = this.messageRepository.getMessagesByChatId(chatId);
    if (!messages) {
      throw new NotFoundError("No messages found");
    }
    return messages;
  }

  async deleteMessage(id: string) {
    const currentMessage = await this.messageRepository.getMessageById(id);
    if (!currentMessage) {
      throw new NotFoundError("Message not found");
    }
    return this.messageRepository.deleteMessage(id);
  }
}
