import express from "express";
import { User } from "../model/user";
import { AuthController } from "../controller/auth";
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
          name: user.getName(),
          email: user.getEmail(),
        },
        token,
      });
    })
  );

  router.post(
    "/login",
    asyncErrorHandler(async (req, res, next) => {
      const { email, password } = req.body;
      const { token } = await authController.login({ email, password });
      res.status(200).json({ success: true, token });
    })
  );
  return router;
};
