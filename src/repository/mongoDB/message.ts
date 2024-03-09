import { MessageRepository } from "../message";
import { Message as MessageSchema } from "./mongooseSchema/Message";
import { Message } from "../../models/messages";
export class MongoMessageRepository extends MessageRepository {
  async createMessage(message: Message): Promise<Message> {
    const newMessage = new MessageSchema({
      body: message.body,
      senderId: message.senderId,
      chatId: message.chatId,
    });
    await newMessage.save();
    return message;
  }

  async getMessageById(id: string): Promise<Message> {
    const message = await MessageSchema.findById(id);
    const transformedMessage = new Message({
      id: message._id.toString(),
      body: message.body,
      senderId: message.senderId.toString(),
      chatId: message.chatId.toString(),
    });
    return transformedMessage;
  }

  async deleteMessage(id: string): Promise<void> {
    await MessageSchema.findByIdAndDelete(id);
  }

  async getMessagesByChatId(chatId: string): Promise<Message[]> {
    const messages = await MessageSchema.find({ chatId });
    const transformedMessages = messages.map((message) => {
      return new Message({
        id: message._id.toString(),
        body: message.body,
        senderId: message.senderId.toString(),
        chatId: message.chatId.toString(),
      });
    });
    return transformedMessages;
  }
}
