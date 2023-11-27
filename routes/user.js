const router = require("express").Router();

// Middleware
const verifyToken = require("../middlewares/verifyToken");
const Validator = require("../middlewares/validation");
const userSchema = require("../validation/users");
const Users = require("../controllers/users");
const authorization = require("../middlewares/authorization");

// GET ALL
router.get("/", verifyToken, Users.getAll);

// GET USER STATS CREATE AT
router.get("/stats", verifyToken, Users.getStats);

// GET
router.get("/find/:id", verifyToken, Users.getById);

// CREATE
router.post(
  "/create",
  verifyToken,
  Validator(userSchema.create),
  authorization(["admin"]),
  Users.create
);

// UPDATE
router.patch(
  "/update/:id",
  verifyToken,
  Validator(userSchema.update),
  authorization(["admin"]),
  Users.updateById
);

// DELETE
router.delete("/:id", verifyToken, authorization(["admin"]), Users.deleteById);

module.exports = router;
