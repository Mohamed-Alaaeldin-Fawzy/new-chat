import { ChatRepository } from "../repository/chat";
import { Chat } from "../models/chat";
import { BadRequestError } from "../Error/badRequestError";
import { chatSchema } from "../validation/chat";

export class ChatController {
  constructor(public chatRepository: ChatRepository) {}

  async getChatsByUserId(userId: string): Promise<Object[]> {
    const chats = await this.chatRepository.getChatsByUserId(userId);
    return chats.map((chat) => {
      return {
        id: chat.id,
        name: chat.name,
        usersIds: chat.usersIds,
      };
    });
  }

  async createChat(chat: Chat, userId: string): Promise<Object> {
    const chatError = chatSchema.validate({
      name: chat.name,
      usersIds: chat.usersIds,
    });
    if (chatError.error) {
      throw new BadRequestError(chatError.error.message);
    }
    if (!chat.usersIds.includes(userId)) {
      throw new BadRequestError("Can't create chat without you in it!!");
    }

    const newChat = await this.chatRepository.createChat(chat);
    if (!newChat) {
      throw new BadRequestError("Error while creating chat");
    }

    return {
      id: newChat.id,
      name: newChat.name,
      usersIds: newChat.usersIds,
    };
  }
}
