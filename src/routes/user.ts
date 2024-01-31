import express from "express";
import { UserController } from "../controller/user";
import { User } from "model/user";

const router = express.Router();

export const user = (userController: UserController) => {
  router.get("/", async (req, res) => {
    const users = await userController.getUsers();
    res.status(200).json(users);
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await userController.getUserById(id);
    res.status(200).json(user);
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const newUser: User = req.body;
    const user = await userController.updateUser(id, newUser);
    res.status(200).json(user);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await userController.deleteUser(id);
    res.status(200).json({ success: true });
  });

  return router;
};
