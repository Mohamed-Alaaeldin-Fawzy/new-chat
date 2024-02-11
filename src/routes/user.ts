import express from "express";
import { UserController } from "../controller/user";
import { User } from "model/user";

const router = express.Router();

export const userRouter = (userController: UserController) => {
  router.get("/", async (req, res, next) => {
    try {
      const users = await userController.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  });

  router.get("/me", async (req, res, next) => {
    try {
      const { id } = req.app.locals.user;
      const user = await userController.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const newUser: User = req.body;
      const user = await userController.updateUser(id, newUser);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      await userController.deleteUser(id);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
