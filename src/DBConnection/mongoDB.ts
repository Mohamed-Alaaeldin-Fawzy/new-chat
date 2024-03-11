import mongoose from "mongoose";

export const connectToMongo = async () => {
  mongoose.Promise = Promise;

  mongoose.connect(process.env.MONGO_URL as string);

  console.log("MONGODB CONNECTED");

  mongoose.connection.on("error", (error) => {
    console.log(error);
  });
};
