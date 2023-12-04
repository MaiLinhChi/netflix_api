const router = require("express").Router();

// Middleware
const { verifyAccessToken } = require("../middlewares/verifyToken");
const Validator = require("../middlewares/validation");

const Movies = require("../controllers/movies");
const moviesSchema = require("../validation/movies");
const authorization = require("../middlewares/authorization");

// GET ALL
router.get("/", verifyAccessToken, Movies.getAll);

// GET SUGGESTEDS
router.get(
  "/suggesteds",
  verifyAccessToken,
  Validator(moviesSchema.suggest),
  Movies.suggest
);

// GET BY NAME
router.get("/search", Validator(moviesSchema.search), Movies.search);

// GET
router.get("/find/:id", Movies.findById);

// GET RANDOM
router.get("/random", Validator(moviesSchema.random), Movies.random);

// CREATE
router.post(
  "/create",
  verifyAccessToken,
  Validator(moviesSchema.create),
  authorization(["admin", "manager"]),
  Movies.create
);

// UPDATE
router.patch(
  "/update/:id",
  verifyAccessToken,
  Validator(moviesSchema.update),
  authorization(["admin", "manager"]),
  Movies.update
);

// DELETE
router.delete(
  "/:id",
  verifyAccessToken,
  authorization(["admin", "manager"]),
  Movies.delete
);

module.exports = router;
