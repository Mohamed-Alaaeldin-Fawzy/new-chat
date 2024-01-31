import { Message } from "../model/messages";

import { MessageRepository } from "../repository/messageRepository";

export class MessageController {
  constructor(public messageRepository: MessageRepository) {}

  createMessage(message: Message) {
    return this.messageRepository.createMessage(message);
  }

  getMessages() {
    return this.messageRepository.getMessages();
  }

  deleteMessage(id: string) {
    return this.messageRepository.deleteMessage(id);
  }
}
