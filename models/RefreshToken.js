const mongoose = require("mongoose");
const { exRefreshTokenCookies } = require("../configs");

const RefreshToken = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    expires: { type: Number },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      expires: exRefreshTokenCookies,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RefreshToken", RefreshToken);
