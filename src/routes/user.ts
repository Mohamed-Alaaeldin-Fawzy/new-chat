import express from "express";
import { UserController } from "../controllers/user";
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
      const id = req.app.locals.userId;
      const user = await userController.getUserById(id);
      res.status(200).json(user);
    })
  );

  router.put(
    "/me",
    asyncErrorHandler(async (req, res, next) => {
      const { email, name, image } = req.body;
      const id = req.app.locals.userId;
      const newUser = await userController.updateUser({
        email,
        name,
        image,
        id,
      });
      res.status(200).json(newUser);
    })
  );

  return router;
};
