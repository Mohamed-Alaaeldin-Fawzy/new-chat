import { InMemoryUserRepository } from "./src/repository/inMemory/user";
import { InMemoryChatRepository } from "./src/repository/inMemory/chat";
import { InMemoryMessageRepository } from "./src/repository/inMemory/message";
import { User } from "./src/models/user";
import { Chat } from "./src/models/chat";
import { Message } from "./src/models/messages";
import bcrypt from "bcrypt";

export const dataSeed = async (
  userRepository: InMemoryUserRepository,
  chatRepository: InMemoryChatRepository,
  messageRepository: InMemoryMessageRepository
) => {
  const users = [
    {
      id: "123",
      name: "User 0",
      email: "user0@example.com",
      password: await bcrypt.hash("123456", 10),
    },
    {
      id: "456",
      name: "User 1",
      email: "user1@example.com",
      password: await bcrypt.hash("123456", 10),
    },
    {
      id: "789",
      name: "User 2",
      email: "user2@example.com",
      password: await bcrypt.hash("123456", 10),
    },
  ];

  const chats = [
    {
      id: "111",
      name: "Chat 0",
      usersIds: ["123", "456", "789"],
    },
    {
      id: "222",
      name: "Chat 1",
      usersIds: ["123", "456", "789"],
    },
    {
      id: "333",
      name: "Chat 2",
      usersIds: ["123", "456", "789"],
    },
  ];

  const messages = [
    {
      id: "c03e4493-8a6c-4fed-bd52-7bd112c33888",
      body: "Message 0 in Chat 0",
      senderId: "123",
      chatId: "111",
    },
    {
      id: "21cb09c0-7833-4d52-9966-3c54b11d0526",
      body: "Message 1 in Chat 0",
      senderId: "123",
      chatId: "111",
    },
    {
      id: "a708f268-8397-4d94-a71f-179c9661f938",
      body: "Message 2 in Chat 0",
      senderId: "456",
      chatId: "111",
    },
    {
      id: "bf9f50af-4813-493f-a180-3216967cbdd3",
      body: "Message 0 in Chat 1",
      senderId: "789",
      chatId: "222",
    },
    {
      id: "cfd051bd-d4e9-435d-8069-f3e94bb9e708",
      body: "Message 1 in Chat 1",
      senderId: "123",
      chatId: "222",
    },
    {
      id: "bd48a2c0-3282-43cd-bfe0-c0085a8be9a4",
      body: "Message 2 in Chat 1",
      senderId: "456",
      chatId: "222",
    },
    {
      id: "214bb04d-1cb1-4e1b-ae21-f5d7a957df54",
      body: "Message 0 in Chat 2",
      senderId: "789",
      chatId: "333",
    },
    {
      id: "768c00bd-e69b-43f7-930d-6b8bafd1bd88",
      body: "Message 1 in Chat 2",
      senderId: "456",
      chatId: "333",
    },
    {
      id: "d5e80255-24a9-4a25-9702-812a5af97be2",
      body: "Message 2 in Chat 2",
      senderId: "123",
      chatId: "333",
    },
  ];

  for (const user of users) {
    await userRepository.createUser(new User(user));
  }

  for (const chat of chats) {
    await chatRepository.createChat(new Chat(chat));
  }

  for (const message of messages) {
    await messageRepository.createMessage(new Message(message));
  }
};
