import express from "express";
import { MessageController } from "../controller/message";

const router = express.Router();

export const messageRouter = (messageController: MessageController) => {
  router.get("/:chatId", async (req, res, next) => {
    try {
      const messages = await messageController.getMessagesByChatId(
        req.params.chatId
      );
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const message = req.body;
      const newMessage = await messageController.createMessage(message);
      res.status(201).json(newMessage);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await messageController.deleteMessage(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
