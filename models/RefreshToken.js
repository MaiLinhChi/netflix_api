const mongoose = require("mongoose");
const { exRefreshTokenCookies } = require("../configs");

const RefreshToken = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: exRefreshTokenCookies,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RefreshToken", RefreshToken);
