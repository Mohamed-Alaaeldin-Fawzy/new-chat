import { ChatRepository } from "../repository/chatRepository";
import { Chat } from "../model/chat";
export class ChatController {
  constructor(public chatRepository: ChatRepository) {}

  getChats() {
    return this.chatRepository.getChats();
  }

  createChat(chat: Chat) {
    return this.chatRepository.createChat(chat);
  }

  updateChat(id: string, chat: Chat) {
    return this.chatRepository.updateChat(id, chat);
  }

  // TODO Should implement Logic for Getting messages from database based on chatId
  getMessagesByChatId(chatId: string) {
    return;
  }
}
