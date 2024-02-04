import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    validate: [(name: string) => name.length > 0, "Name cannot be empty"],
  },
  senderId: {
    type: [mongoose.Schema.Types.ObjectId],
    required: [true, "Email is required"],
    ref: "User",
  },
  chatId: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Chat",
  },
});

export const Message = mongoose.model("Message", messageSchema);
