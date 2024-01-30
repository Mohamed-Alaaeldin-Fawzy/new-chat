import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: [(name: string) => name.length > 0, "Name cannot be empty"],
  },
  body: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "User already exists"],
  },
  usersIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },
});

export const Chat = mongoose.model("Chat", chatSchema);
