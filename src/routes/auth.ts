import express from "express";
import { User } from "../model/user";
import { AuthController } from "../controller/auth";

export const router = express.Router();

export const authRouter = (authController: AuthController) => {
  router.post("/register", async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const user = new User({ name, email, password });

      await authController.register(user);
      res.status(201).json({
        success: true,
        user: {
          name: user.getName(),
          email: user.getEmail(),
        },
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { token } = await authController.login({ email, password });
      res.status(200).json({ success: true, token });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
