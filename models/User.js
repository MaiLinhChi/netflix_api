const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    job: { type: String },
    address: { type: String },
    profilePicture: { type: String, default: "" },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "guest",
      enum: ["admin", "manager", "guest"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
