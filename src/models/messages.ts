export class Message {
  private id?: string;
  private body: string;
  private senderId: string;
  private chatId: string;

  constructor({
    id,
    body,
    senderId,
    chatId,
  }: {
    id?: string;
    body: string;
    senderId: string;
    chatId: string;
  }) {
    this.id = id;
    this.body = body;
    this.senderId = senderId;
    this.chatId = chatId;
  }

  getId = (): string => {
    return this.id;
  };

  getBody = (): string => {
    return this.body;
  };

  getSenderId = (): string => {
    return this.senderId;
  };

  getChatId = (): string => {
    return this.chatId;
  };

  setId = (id: string): void => {
    this.id = id;
  };

  setBody = (body: string): void => {
    this.body = body;
  };

  setSenderId = (senderId: string): void => {
    this.senderId = senderId;
  };

  setChatId = (chatId: string): void => {
    this.chatId = chatId;
  };
}
