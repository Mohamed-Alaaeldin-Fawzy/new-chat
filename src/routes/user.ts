import express from "express";
import { UserController } from "../controller/user";
import { User } from "model/user";
import { asyncErrorHandler } from "../util/asyncErrorHandler";

const router = express.Router();

export const userRouter = (userController: UserController) => {
  router.get(
    "/",
    asyncErrorHandler(async (req, res, next) => {
      const users = await userController.getUsers();
      res.status(200).json(users);
    })
  );

  router.get(
    "/me",
    asyncErrorHandler(async (req, res, next) => {
      const { id } = req.app.locals.user;
      const user = await userController.getUserById(id);
      res.status(200).json(user);
    })
  );

  router.put(
    "/:id",
    asyncErrorHandler(async (req, res, next) => {
      const { id } = req.params;
      const newUser: User = req.body;
      const user = await userController.updateUser(id, newUser);
      res.status(200).json(user);
    })
  );

  router.delete(
    "/:id",
    asyncErrorHandler(async (req, res, next) => {
      const { id } = req.params;
      await userController.deleteUser(id);
      res.status(200).json({ success: true });
    })
  );

  return router;
};
