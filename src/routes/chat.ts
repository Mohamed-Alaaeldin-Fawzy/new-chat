import express from "express";
import { ChatController } from "../controller/chat";
import { Chat } from "../model/chat";
import { asyncErrorHandler } from "../util/asyncErrorHandler";

const router = express.Router();

export const chatRouter = (chatController: ChatController) => {
  router.get(
    "/:id",
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

  router.put(
    "/:id",
    asyncErrorHandler(async (req, res, next) => {
      const { id } = req.params;
      const chat = req.body;
      const updatedChat = await chatController.updateChat(id, chat);
      res.status(200).json(updatedChat);
    })
  );

  return router;
};
