const Movie = require("../models/Movie");

const {
  isObjectId,
  checkDocumentExistWithFields,
} = require("../utils/checkParameter");

module.exports = {
  getAll: async (req, res) => {
    try {
      const movies = await Movie.find();
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  findById: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      return res.status(200).json(movie);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  random: async (req, res) => {
    const type = req.query.type || "";
    let movie;
    try {
      if (type) {
        movie = await Movie.aggregate([
          { $match: { type: type } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([{ $sample: { size: 1 } }]);
      }
      return res.status(200).json(...movie);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  suggest: async (req, res) => {
    const id = req.query.id;
    const type = req.query.type || "movies";
    let genre = req.query.genre || "";
    let movies = [];

    if (genre !== "" && genre) {
      genre = genre.split(",")[0];
    }

    try {
      movies = await Movie.find({
        type: type,
        genre: { $all: genre },
        _id: { $ne: id },
      });
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  search: async (req, res) => {
    const title = req.query.q || "";
    let movies = [];
    try {
      movies = await Movie.find({
        title: { $regex: title.toLowerCase(), $options: "i" },
      }).limit(5);
      return res.status(200).json(movies);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    const fieldList = ["title"];
    await checkDocumentExistWithFields(Movie, null, fieldList, req);
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      return res.status(201).json(savedMovie);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      isObjectId(req.params.id);
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      return updatedMovie
        ? res.status(200).json(updatedMovie)
        : res.status(404).json("Movie not found");
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      isObjectId(req.params.id);
      const movieDeleted = await Movie.findByIdAndDelete(req.params.id);
      if (!movieDeleted) return res.status(404).json("Movie not found");
      return res.status(200).json(movieDeleted);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
};
