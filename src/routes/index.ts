import { UserRoute } from "./userRoute";
import { UserController } from "../controller/user";
import express from "express";

export const router = () => {
  const userRouter = new UserRoute();
  userRouter.getRouter().post("/auth", userRouter.register.bind(userRouter));
  return userRouter.getRouter();
};
