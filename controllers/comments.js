const Comment = require("../models/Comment");
const { isObjectId } = require("../utils/checkParameter");

module.exports = {
  getCommentOfMovie: async (req, res) => {
    try {
      isObjectId([req.query.movieId]);
      const data = await Comment.find({
        movieId: req.query.movieId,
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
  create: async (req, res) => {
    try {
      isObjectId([req.body.userId, req.body.movieId]);
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      return res.status(201).json(savedComment);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      isObjectId([req.params.id]);
      const updated = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return updated
        ? res.status(200).json(updated)
        : res.status(404).json("Comment not found");
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      isObjectId([req.params.id]);
      const deleted = await Comment.findByIdAndDelete(req.params.id);
      return deleted
        ? res.status(200).json(deleted)
        : res.status(404).json("Comment not found");
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
};
