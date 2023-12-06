const mongoose = require("mongoose");
const { expiredInRefreshToken } = require("../configs");

const RefreshToken = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expire: { type: Number },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: expiredInRefreshToken,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RefreshToken", RefreshToken);
