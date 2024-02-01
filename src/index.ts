import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { auth } from "./routes/auth";
import { user } from "./routes/user";
import { chat } from "./routes/chat";
import { message } from "./routes/message";
import { InMemoryChatRepository } from "./repository/inMemory/inMemoryChat";
import { ChatController } from "./controller/chat";
import { User as InMemoryUser } from "./repository/inMemory/inMemoryUser";
import { UserController } from "./controller/user";
import { AuthController } from "./controller/auth";
import { MessageController } from "./controller/message";
import { InMemoryMessageRepository } from "./repository/inMemory/inMemoryMessage";
import { isAuthenticated } from "./middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(compression());

app.use(bodyParser.json());

app.use(cookieParser());

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const userRepository = new InMemoryUser();
const chatRepository = new InMemoryChatRepository();
const chatController = new ChatController(chatRepository);
const authController = new AuthController(userRepository);
const userController = new UserController(userRepository);

app.use("/user", isAuthenticated, user(userController));

app.use("/auth", auth(authController));

app.use("/chat", isAuthenticated, chat(chatController));

app.use(
  "/message",
  message(new MessageController(new InMemoryMessageRepository()))
);
