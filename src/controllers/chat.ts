import { ChatRepository } from "../repository/chat";
import { Chat } from "../models/chat";
import { BadRequestError } from "../Error/badRequestError";
import { chatSchema } from "../validation/chat";
import { validate } from "../util/validate";

export class ChatController {
  constructor(public chatRepository: ChatRepository) {}

  async getChatsByUserId(userId: string): Promise<Object[]> {
    const chats = await this.chatRepository.getChatsByUserId(userId);

    return chats.map(({ id, name, usersIds }) => ({ id, name, usersIds }));
  }

  async createChat({ name, usersIds }: Chat): Promise<Object> {
    validate(chatSchema, { name, usersIds }, BadRequestError);

    const newChat = await this.chatRepository.createChat({
      name,
      usersIds,
    });

    return { id: newChat.id, name: newChat.name, usersIds: newChat.usersIds };
  }
}
