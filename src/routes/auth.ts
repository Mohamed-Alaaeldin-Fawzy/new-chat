import express from "express";
import { User } from "../model/user";
import { AuthController } from "../controller/auth";
import { User as InMemoryUser } from "../repository/inMemory/inMemoryUser";
const app = express();

export const auth = () =>
  app.post("/auth", async (req, res) => {
    try {
      const { email, password, name } = req.body;

      const userController = new AuthController(new InMemoryUser());

      const user = new User({ name, email, password });

      await userController.register(user);

      res.status(201).json({
        success: true,
        user: {
          name: user.getName(),
          email: user.getEmail(),
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
      throw error;
    }
  });
