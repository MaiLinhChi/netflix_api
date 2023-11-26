const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String },
    imageTitle: { type: String },
    imageSmall: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: Number },
    duration: { type: String },
    limit: { type: Number },
    genre: { type: Array },
    country: { type: String, require: true },
    type: { type: String, require: true },
    starring: { type: Array },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
