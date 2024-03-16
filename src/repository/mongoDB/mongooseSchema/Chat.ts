import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (name: string) => name.length > 0 && name.length <= 100,
      message: "Name must be between 1 and 100 characters",
    },
  },
  usersIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "User", // Reference to the User model
  },
});

export const Chat = mongoose.model("Chat", chatSchema);
