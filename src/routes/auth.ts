import express from "express";
import { User } from "../model/user";
import { AuthController } from "../controller/auth";

export const router = express.Router();

export const auth = (authController: AuthController) => {
  router.post("/", async (req, res) => {
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
      console.error("Registration error:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  return router;
};
