const router = require("express").Router();

// Middleware
const verifyToken = require("../middlewares/verifyToken");
const Validator = require("../middlewares/validation");

const Movies = require("../controllers/movies");
const moviesSchema = require("../validation/movies");

// GET ALL
router.get("/", verifyToken, Movies.getAll);

// GET SUGGESTEDS
router.get("/suggesteds", Validator(moviesSchema.suggest), Movies.suggest);

// GET BY NAME
router.get("/search", Validator(moviesSchema.search), Movies.search);

// GET
router.get("/find/:id", Movies.findById);

// GET RANDOM
router.get("/random", Validator(moviesSchema.random), Movies.random);

// CREATE
router.post(
  "/create",
  verifyToken,
  Validator(moviesSchema.create),
  Movies.create
);

// UPDATE
router.patch(
  "/update/:id",
  verifyToken,
  Validator(moviesSchema.update),
  Movies.update
);

// DELETE
router.delete("/:id", verifyToken, Movies.delete);

module.exports = router;
