import { UserRoute } from "./userRoute";
import { UserController } from "../controller/user";
import { MongoUser } from "../repository/mongoDB/mongoUser";

export const router = () => {
  const userRouter = new UserRoute(new UserController(new MongoUser()));
  userRouter.getRouter().post("/auth", userRouter.register.bind(userRouter));
  return userRouter.getRouter();
};
