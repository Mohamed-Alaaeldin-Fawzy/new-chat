export class Message {
  id: string;
  body: string;
  senderId: string;
  ChatId: string;

  constructor(id: string, body: string, senderId: string, ChatId: string) {
    this.id = id;
    this.body = body;
    this.senderId = senderId;
    this.ChatId = ChatId;
  }
}
