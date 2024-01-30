import { UserController } from "../controller/user";
import express from "express";

export class UserRoute {
  private userController: UserController;
  private router: express.Router;
  // private initializeRoutes : () => void
  constructor() {
    this.userController = new UserController();
    this.router = express.Router();
    // this.initializeRoutes();
  }

  // private initializeRoutes() {
  //   this.router.post("/register", this.register.bind(this));
  //   this.router.post("/login", this.login.bind(this));
  //   this.router.delete("/delete", this.delete.bind(this));
  // }

  public async register(req: express.Request, res: express.Response) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new Error("Name, email and password are required");
      }
      const user = await this.userController.register(name, email, password);

      return res.status(201).json(user);
    } catch (error) {
      res.status(500).send(error.message || "Internal Server Error");
      throw error;
    }
  }
  public sayHello(req: express.Request, res: express.Response) {
    res.send("hello");
  }
  public async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;
      const user = await this.userController.login(email, password);
      res.send(user);
    } catch (error) {
      console.log("error", error);
      res.status(500).send(error.message || "Internal Server Error");
    }
  }

  public async delete(req: express.Request, res: express.Response) {
    try {
      const { email } = req.body;
      const user = await this.userController.delete(email);
      res.send(user);
    } catch (error) {
      console.log("error", error);
      res.status(500).send(error.message || "Internal Server Error");
    }
  }

  public getRouter() {
    return this.router;
  }
}
