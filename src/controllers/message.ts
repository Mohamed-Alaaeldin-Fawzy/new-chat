import { Message } from "../models/messages";
import { MessageRepository } from "../repository/message";
import { NotFoundError } from "../Error/notFoundError";
import { BadRequestError } from "../Error/badRequestError";
import { messageSchema } from "../validation/message";

export class MessageController {
  constructor(public messageRepository: MessageRepository) {}

  async createMessage(message: Message): Promise<Object> {
    const messageError = messageSchema.validate({
      body: message.body,
      senderId: message.senderId,
      chatId: message.chatId,
    });
    if (messageError.error) {
      throw new BadRequestError(messageError.error.message);
    }

    const newMessage = await this.messageRepository.createMessage(message);
    if (!newMessage) {
      throw new BadRequestError("Error while creating message");
    }
    return {
      id: newMessage.id,
      body: newMessage.body,
      senderId: newMessage.senderId,
      chatId: newMessage.chatId,
    };
  }

  async getMessagesByChatId(chatId: string): Promise<Object[]> {
    const messages = await this.messageRepository.getMessagesByChatId(chatId);
    if (!messages) {
      throw new NotFoundError("No messages found");
    }
    return messages.map((message) => {
      return {
        id: message.id,
        body: message.body,
        senderId: message.senderId,
        chatId: message.chatId,
      };
    });
  }
}
