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
import { InMemoryChatRepository } from "./repository/inMemory/inMemoryChat";
import { ChatController } from "./controller/chat";
import { InMemoryUserRepository } from "./repository/inMemory/inMemoryUser";
import { UserController } from "./controller/user";
import { AuthController } from "./controller/auth";
import { MessageController } from "./controller/message";
import { InMemoryMessageRepository } from "./repository/inMemory/inMemoryMessage";
import { isAuthenticated } from "./middleware";
import { errorHandler } from "./util/errorHandler";
import { connectToMongo } from "./DBConnection/mongoDBConnection";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.use(
  cors({
    origin: `${process.env.HOST}:${process.env.PORT}`,
    credentials: true,
  })
);

app.use(compression());

app.use(bodyParser.json());

app.use(cookieParser());

if (process.env.DB === "MONGO") {
  connectToMongo();
} else {
  console.log(`DB: ${process.env.DB}`);
}

const userRepository = new InMemoryUserRepository();
const chatRepository = new InMemoryChatRepository();
const inMemoryMessageRepository = new InMemoryMessageRepository();

const chatController = new ChatController(chatRepository);
const authController = new AuthController(userRepository);
const userController = new UserController(userRepository);
const messageController = new MessageController(inMemoryMessageRepository);

app.use("/auth", authRouter(authController));

app.use(isAuthenticated);

app.use("/user", userRouter(userController));

app.use("/chat", chatRouter(chatController));

app.use("/message", messageRouter(messageController));

app.use(errorHandler);
