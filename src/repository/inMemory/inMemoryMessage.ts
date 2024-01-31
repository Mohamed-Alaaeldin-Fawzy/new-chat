import { MessageRepository } from "../messageRepository";
import { Message } from "../../model/messages";
const messages: Message[] = [];
export class InMemoryMessageRepository extends MessageRepository {
  async getMessages(): Promise<Message[]> {
    return messages;
  }

  async createMessage(message: Message): Promise<Message> {
    messages.push(message);
    return message;
  }

  async deleteMessage(id: string): Promise<void> {
    const messageIndex = messages.findIndex((message) => message.id === id);
    if (messageIndex !== -1) {
      messages.splice(messageIndex, 1);
    }
  }
}
