import { UserController } from "../controller/user";
import express, { Request, Response } from "express";
import { MongoUser } from "../repository/mongoDB/mongoUser";
import { User as UserModel } from "../model/user";

export class UserRoute {
  public router = express.Router();
  public userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  public async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const user = new UserModel();
      user.setEmail(email);
      user.setPassword(password);
      user.setName(name);

      await this.userController.register(user);

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
  }

  public getRouter() {
    return this.router;
  }
}
