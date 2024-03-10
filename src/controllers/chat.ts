import { ChatRepository } from "../repository/chat";
import { Chat } from "../models/chat";
import { BadRequestError } from "../Error/badRequestError";
import { chatSchema } from "../validation/chat";
import { validate } from "util/validate";

export class ChatController {
  constructor(public chatRepository: ChatRepository) {}

  async getChatsByUserId(userId: string): Promise<Object[]> {
    const chats = await this.chatRepository.getChatsByUserId(userId);

    return chats.map(({ id, name, usersIds }) => ({ id, name, usersIds }));
  }

  async createChat(chat: Chat): Promise<Object> {
    const { id, name, usersIds } = chat;

    validate(chatSchema, chat, BadRequestError);

    const newChat = await this.chatRepository.createChat({
      id,
      name,
      usersIds,
    });

    return { id: newChat.id, name: newChat.name, usersIds: newChat.usersIds };
  }
}
