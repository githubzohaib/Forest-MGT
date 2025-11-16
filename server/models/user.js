// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ranger",  "admin"],
      default: "ranger",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;