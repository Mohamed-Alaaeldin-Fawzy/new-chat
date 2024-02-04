import { ChatRepository } from "../repository/chatRepository";
import { Chat } from "../model/chat";
import { NotFoundError } from "../Error/notFoundError";
import { BadRequestError } from "../Error/badRequestError";

export class ChatController {
  constructor(public chatRepository: ChatRepository) {}

  async getChatsByUserId(userId: string) {
    const chats = await this.chatRepository.getChatsByUserId(userId);
    if (!chats) {
      throw new NotFoundError("No chats found");
    }
    return chats;
  }

  async createChat(chat: Chat) {
    if (!chat) {
      throw new BadRequestError("Please provide a chat");
    }
    const NewChat = this.chatRepository.createChat(chat);
    if (!NewChat) {
      throw new BadRequestError("Error while creating chat");
    }
    return NewChat;
  }

  async updateChat(id: string, chat: Chat) {
    if (!chat) {
      throw new BadRequestError("Please provide a chat");
    }
    const currentChat = await this.chatRepository.getChatById(id);
    if (!currentChat) {
      throw new NotFoundError("Chat not found");
    }
    const updatedChat = this.chatRepository.updateChat(id, chat);
    if (!updatedChat) {
      throw new BadRequestError("Error while updating chat");
    }
    return updatedChat;
  }
}
