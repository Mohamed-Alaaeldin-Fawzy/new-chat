import express from "express";
import { ChatController } from "../controller/chat";

const router = express.Router();

export const chatRouter = (chatController: ChatController) => {
  router.get("/", async (req, res, next) => {
    try {
      const userId = req.app.locals.user.id;
      const chats = await chatController.getChatsByUserId(userId);
      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const chat = req.body;
      const newChat = await chatController.createChat(chat);
      res.status(201).json(newChat);
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const chat = req.body;
      const updatedChat = await chatController.updateChat(id, chat);
      res.status(200).json(updatedChat);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
