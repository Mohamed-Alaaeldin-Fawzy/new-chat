import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { chatRouter } from "./routes/chat";
import { messageRouter } from "./routes/message";
import { InMemoryChatRepository } from "./repository/inMemory/chat";
import { MongoChatRepository } from "./repository/mongoDB/chat";
import { ChatController } from "./controllers/chat";
import { InMemoryUserRepository } from "./repository/inMemory/user";
import { MongoUserRepository } from "./repository/mongoDB/user";
import { UserController } from "./controllers/user";
import { AuthController } from "./controllers/auth";
import { MessageController } from "./controllers/message";
import { InMemoryMessageRepository } from "./repository/inMemory/message";
import { MongoMessageRepository } from "./repository/mongoDB/message";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { errorHandler } from "./middlewares/errorHandler";
import { dataSeed } from "../dataSeed";
import { connectToMongo } from "./DBConnection/mongoDB";
import { invalidRouter } from "./routes/invalid";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.use(compression());

app.use(bodyParser.json());

app.use(cookieParser());

connectToMongo();

const onlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  onlineUsers.set(userId, socket.id);

  // Emit the updated list of online users
  io.emit("online-users", Array.from(onlineUsers.keys()));

  socket.on("joinChat", (data) => {
    socket.join(data);
  });

  socket.on("sendMessage", (data) => {
    socket
      .to(data.messageObject.chatId)
      .emit("messageReceived", data.messageObject);
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const userRepository = new MongoUserRepository();
const chatRepository = new MongoChatRepository();
const messageRepository = new MongoMessageRepository();

const chatController = new ChatController(chatRepository);
const authController = new AuthController(userRepository);
const userController = new UserController(userRepository);
const messageController = new MessageController(messageRepository);

// dataSeed(userRepository, chatRepository, messageRepository);

app.use("/", authRouter(authController));

app.use(isAuthenticated);

app.use("/user", userRouter(userController));

app.use("/chat", chatRouter(chatController));

app.use("/message", messageRouter(messageController));

app.use("/", invalidRouter());

app.use(errorHandler);
