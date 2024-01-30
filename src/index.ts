import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { auth } from "./routes/auth";
import { user } from "./routes/user";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(compression());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static("public"));

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGO_URL as string);

mongoose.connection.on("error", (error) => {
  console.log(error);
});

app.use("/", auth());
app.use("/", user());

// make an instance of userController and pass it to router
// userController instance expects a repository
