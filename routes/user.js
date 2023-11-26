const router = require("express").Router();

// Middleware
const verifyToken = require("../middlewares/verifyToken");
const Validator = require("../middlewares/validation");
const userSchema = require("../validation/users");
const Users = require("../controllers/users");

// GET ALL
router.get("/", verifyToken, Users.getAll);

// GET USER STATS CREATE AT
router.get("/stats", verifyToken, Users.getStats);

// GET
router.get("/find/:id", verifyToken, Users.getById);

// CREATE
router.post("/create", verifyToken, Validator(userSchema.create), Users.create);

// UPDATE
router.patch(
  "/update/:id",
  verifyToken,
  Validator(userSchema.update),
  Users.updateById
);

// DELETE
router.delete("/:id", verifyToken, Users.deleteById);

module.exports = router;
