import { Chat } from "../model/chat";
import { Types } from "mongoose";
export abstract class ChatRepository {
  abstract createChat(chat: Chat): Promise<Chat>;
  abstract getChats(): Promise<Chat[]>;
  abstract updateChat(id: string | Types.ObjectId, chat: Chat): Promise<Chat>;
  // abstract sendMessages(): void; /* is it the ChatRepository responsibility to send Messages ??  *?
}
