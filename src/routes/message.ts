import express from "express";
import { MessageController } from "../controllers/message";
import { Message } from "../models/messages";
import { asyncErrorHandler } from "../util/asyncErrorHandler";

const router = express.Router();

export const messageRouter = (messageController: MessageController) => {
  router.get(
    "/:chatId",
    asyncErrorHandler(async (req, res, next) => {
      const { chatId } = req.params;
      const messages = await messageController.getMessagesByChatId(chatId);
      res.status(200).json(messages);
    })
  );

  router.post(
    "/",
    asyncErrorHandler(async (req, res, next) => {
      const { chatId, body } = req.body;
      const senderId = req.app.locals.userId;
      const newMessage = await messageController.createMessage(
        new Message({ senderId, chatId, body })
      );
      res.status(201).json(newMessage);
    })
  );

  router.delete(
    "/:id",
    asyncErrorHandler(async (req, res, next) => {
      const { id } = req.params;
      await messageController.deleteMessage(id);
      res.sendStatus(204);
    })
  );

  return router;
};
