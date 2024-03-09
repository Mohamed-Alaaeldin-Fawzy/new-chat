export class Message {
  private _id?: string;
  private _body: string;
  private _senderId: string;
  private _chatId: string;

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
    this._id = id;
    this._body = body;
    this._senderId = senderId;
    this._chatId = chatId;
  }

  get id(): string {
    return this._id;
  }

  get body(): string {
    return this._body;
  }

  get senderId(): string {
    return this._senderId;
  }

  get chatId(): string {
    return this._chatId;
  }

  set id(id: string) {
    this._id = id;
  }

  set body(body: string) {
    this._body = body;
  }

  set senderId(senderId: string) {
    this._senderId = senderId;
  }

  set chatId(chatId: string) {
    this._chatId = chatId;
  }
}
