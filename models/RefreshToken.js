const mongoose = require("mongoose");
const { exRefreshTokenMillisecond } = require("../configs");

const RefreshToken = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expire: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: exRefreshTokenMillisecond,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RefreshToken", RefreshToken);
