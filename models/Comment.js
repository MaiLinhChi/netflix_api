const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
