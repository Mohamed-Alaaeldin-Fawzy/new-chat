import express from "express";
import { ChatController } from "../controllers/chat";
import { Chat } from "../models/chat";
import { asyncErrorHandler } from "../util/asyncErrorHandler";

const router = express.Router();

export const chatRouter = (chatController: ChatController) => {
  router.get(
    "/:userId",
    asyncErrorHandler(async (req, res, next) => {
      const userId = req.params.id;
      const chats = await chatController.getChatsByUserId(userId);
      res.status(200).json(chats);
    })
  );

  router.post(
    "/",
    asyncErrorHandler(async (req, res, next) => {
      const { usersIds, name } = req.body;
      const newChat = await chatController.createChat(
        new Chat({ usersIds, name })
      );
      res.status(201).json(newChat);
    })
  );

  return router;
};
