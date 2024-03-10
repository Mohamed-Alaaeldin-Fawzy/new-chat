import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    validate: {
      validator: (body: string) => body.length > 0 && body.length <= 2000,
      message: "Body must be between 1 and 2000 characters",
    },
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "SenderId is required"],
    ref: "User",
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chat",
  },
});

export const Message = mongoose.model("Message", messageSchema);
