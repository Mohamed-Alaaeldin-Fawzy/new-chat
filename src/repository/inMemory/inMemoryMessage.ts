import { MessageRepository } from "../messageRepository";
import { Message } from "../../model/messages";
export class InMemoryMessageRepository extends MessageRepository {
  private messages: Message[] = [];
  async getMessages(): Promise<Message[]> {
    return this.messages;
  }

  async createMessage(message: Message): Promise<Message> {
    this.messages.push(message);
    return message;
  }

  async deleteMessage(id: string): Promise<void> {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === id
    );
    if (messageIndex !== -1) {
      this.messages.splice(messageIndex, 1);
    }
  }
}
