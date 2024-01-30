import express from "express";
import { User } from "../model/user";
import { UserController } from "../controller/user";
import { User as InMemoryUser } from "../repository/inMemory/inMemoryUser";
const app = express();

export const user = () =>
  app.get("/user", async (req, res) => {
    const userController = new UserController(new InMemoryUser());

    const users = await userController.getUsers();

    res.status(200).json(users);
  });
