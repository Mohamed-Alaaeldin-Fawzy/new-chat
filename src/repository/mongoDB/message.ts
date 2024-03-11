import { MessageRepository } from "../message";
import { Message as MessageSchema } from "./mongooseSchema/Message";
import { Message } from "../../models/messages";
import { DatabaseError } from "../../Error/DatabaseError";
import { NotFoundError } from "../../Error/notFoundError";
export class MongoMessageRepository extends MessageRepository {
  async createMessage(message: Message): Promise<Message> {
    try {
      const newMessage = new MessageSchema({
        body: message.body,
        senderId: message.senderId,
        chatId: message.chatId,
      });
      await newMessage.save();
      return message;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getMessageById(id: string): Promise<Message> {
    try {
      const message = await MessageSchema.findById(id);
      if (!message) throw new Error("Message not found");
      return new Message({
        id: message._id.toString(),
        body: message.body,
        senderId: message.senderId.toString(),
        chatId: message.chatId.toString(),
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async deleteMessage(id: string): Promise<void> {
    try {
      const deletedMessage = await MessageSchema.findByIdAndDelete(id);
      if (!deletedMessage) {
        throw new NotFoundError(`Message with id ${id} not found`);
      }
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async getMessagesByChatId(chatId: string): Promise<Message[]> {
    try {
      const messages = await MessageSchema.find({ chatId });
      return messages.map(
        (message) =>
          new Message({
            id: message._id.toString(),
            body: message.body,
            senderId: message.senderId.toString(),
            chatId: message.chatId.toString(),
          })
      );
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
