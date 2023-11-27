const mongoose = require("mongoose");

const configs = require("../configs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    job: { type: String },
    address: { type: String },
    profilePicture: {
      type: String,
      default: process.env.IMAGE_USER_DEFAULT,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "guest",
      enum: configs.roles,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
