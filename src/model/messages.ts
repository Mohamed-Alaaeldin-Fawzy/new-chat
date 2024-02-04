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

  getId = () => {
    return this.id;
  };

  getBody = () => {
    return this.body;
  };

  getSenderId = () => {
    return this.senderId;
  };

  getChatId = () => {
    return this.chatId;
  };

  setId = (id: string) => {
    this.id = id;
  };

  setBody = (body: string) => {
    this.body = body;
  };

  setSenderId = (senderId: string) => {
    this.senderId = senderId;
  };

  setChatId = (chatId: string) => {
    this.chatId = chatId;
  };
}
