import express from "express";
import { ChatController } from "../controller/chat";

const router = express.Router();

export const chat = (chatController: ChatController) => {
  router.get("/", async (req, res) => {
    const chats = await chatController.getChats();
    res.status(200).json(chats);
  });

  router.post("/", async (req, res) => {
    const chat = req.body;
    const newChat = await chatController.createChat(chat);
    res.status(201).json(newChat);
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const chat = req.body;
    const updatedChat = await chatController.updateChat(id, chat);
    res.status(200).json(updatedChat);
  });

  // ! getting messages logic is not implemented yet
  router.get("/:id/messages", async (req, res) => {
    const { id } = req.params;
    const chat = await chatController.getMessagesByChatId(id);
    res.status(200).json(chat);
  });

  return router;
};
