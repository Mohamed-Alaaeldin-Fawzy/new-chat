import express from "express";
import { User } from "../models/user";
import { AuthController } from "../controllers/auth";
import { asyncErrorHandler } from "../util/asyncErrorHandler";

export const router = express.Router();

export const authRouter = (authController: AuthController) => {
  router.post(
    "/register",
    asyncErrorHandler(async (req, res, next) => {
      const { email, password, name } = req.body;
      const user = new User({ name, email, password });
      await authController.register(user);
      const { token } = await authController.login({ email, password });
      res.status(201).json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
        },
        token,
      });
    })
  );

  router.post(
    "/login",
    asyncErrorHandler(async (req, res, next) => {
      const { email, password } = req.body;
      const { token, user } = await authController.login({ email, password });
      res.status(200).json({ success: true, token, user });
    })
  );
  return router;
};
