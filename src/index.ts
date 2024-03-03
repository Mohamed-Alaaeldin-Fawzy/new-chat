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
import { ChatController } from "./controllers/chat";
import { InMemoryUserRepository } from "./repository/inMemory/user";
import { UserController } from "./controllers/user";
import { AuthController } from "./controllers/auth";
import { MessageController } from "./controllers/message";
import { InMemoryMessageRepository } from "./repository/inMemory/message";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { errorHandler } from "./middlewares/errorHandler";
// import { connectToMongo } from "./DBConnection/mongoDBConnection";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.use(cors());

app.use(compression());

app.use(bodyParser.json());

app.use(cookieParser());

// connectToMongo();

const userRepository = new InMemoryUserRepository();
const chatRepository = new InMemoryChatRepository();
const messageRepository = new InMemoryMessageRepository();

const chatController = new ChatController(chatRepository);
const authController = new AuthController(userRepository);
const userController = new UserController(userRepository);
const messageController = new MessageController(messageRepository);

app.use("/", authRouter(authController));

app.use(isAuthenticated);

app.use("/user", userRouter(userController));

app.use("/chat", chatRouter(chatController));

app.use("/message", messageRouter(messageController));

app.use(errorHandler);
