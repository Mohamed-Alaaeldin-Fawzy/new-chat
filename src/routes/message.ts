import express from "express";
import { MessageController } from "../controller/message";
const router = express.Router();

export const message = (messageController: MessageController) => {
  router.get("/", async (req, res) => {
    const messages = await messageController.getMessages();
    res.status(200).json(messages);
  });

  router.post("/", async (req, res) => {
    const message = req.body;
    const newMessage = await messageController.createMessage(message);
    res.status(201).json(newMessage);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await messageController.deleteMessage(id);
    res.sendStatus(204);
  });

  return router;
};
