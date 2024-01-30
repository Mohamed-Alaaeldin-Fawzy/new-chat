import mongoose from "mongoose";
import { isEmail } from "validator";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: [(name: string) => name.length > 0, "Name cannot be empty"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "User already exists"],
    validate: [isEmail, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
    validate: [(password: string) => password.length > 6, "Password too short"],
  },
});

export const User = mongoose.model("User", userSchema);
