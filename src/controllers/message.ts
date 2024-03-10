import { Message } from "../models/messages";
import { MessageRepository } from "../repository/message";
import { BadRequestError } from "../Error/badRequestError";
import { messageSchema } from "../validation/message";
import { validate } from "util/validate";

export class MessageController {
  constructor(public messageRepository: MessageRepository) {}

  async createMessage(message: Message): Promise<Partial<Message>> {
    const { body, senderId, chatId } = message;

    validate(messageSchema, { body, senderId, chatId }, BadRequestError);

    const createdMessage = await this.messageRepository.createMessage({
      body,
      senderId,
      chatId,
    });

    return {
      id: createdMessage.id,
      body: createdMessage.body,
      senderId: createdMessage.senderId,
      chatId: createdMessage.chatId,
    };
  }

  async getMessagesByChatId(chatId: string): Promise<Object[]> {
    const messages = await this.messageRepository.getMessagesByChatId(chatId);

    return messages.map(({ id, body, senderId, chatId }) => ({
      id,
      body,
      senderId,
      chatId,
    }));
  }
}
