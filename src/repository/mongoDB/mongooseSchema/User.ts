import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: [
      (name: string) => name.length > 0 && name.length <= 100,
      "Name must be between 1 and 100 characters",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [
      (email: string) => email.length > 0 && email.length <= 100,
      "Email must be between 1 and 100 characters",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [
      (password: string) => password.length > 0 && password.length <= 100,
      "Password must be between 1 and 100 characters",
    ],
  },
  image: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
