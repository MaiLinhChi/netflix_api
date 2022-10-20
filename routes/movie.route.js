const router = require("express").Router();

const Movie = require("../models/Movie.model");
// Middleware
const verifyToken = require("../middlewares/verifyToken.middleware");

// CREATE
router.post("/create", verifyToken, async (req, res) => {
  const starring = req.body.starring.split(", ");
  const genre = req.body.genre.split(", ");
  const movie = { ...req.body, starring, genre };
  const newMovie = new Movie(movie);

  try {
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.patch("/:id", verifyToken, async (req, res) => {
  if (req.body.starring) {
    req.body.starring = req.body.starring.split(", ");
  } else if (req.body.genre) {
    req.body.genre = req.body.genre.split(", ");
  }
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json("Movie has been deleted!!!");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET
router.get("/find/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET RANDOM
router.get("/random", async (req, res) => {
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
    res.status(200).json(...movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get("/", verifyToken, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET SUGGESTEDS
router.get("/suggesteds", async (req, res) => {
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
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET BY NAME
router.get("/search", async (req, res) => {
  const title = req.query.q || "";
  let movies = [];

  try {
    movies = await Movie.find({
      title: { $regex: title.toLowerCase(), $options: "i" },
    }).limit(5);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
