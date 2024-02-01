import express from "express";
import { User } from "../model/user";
import { AuthController } from "../controller/auth";

export const router = express.Router();

export const auth = (authController: AuthController) => {
  router.post("/register", async (req, res) => {
    try {
      const { email, password, name, id } = req.body;
      const user = new User({ name, email, password, id });

      await authController.register(user);

      res.status(201).json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({
          success: false,
          error: error.message || "Internal server error",
        });
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const { token } = await authController.login({ email, password });
      res.status(200).json({ success: true, token });
    } catch (error) {
      res
        .status(error.statusCode || 500)
        .json({ success: false, error: error.message });
    }
  });

  return router;
};
