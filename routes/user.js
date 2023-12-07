const router = require("express").Router();

// Middleware
const { verifyAccessToken } = require("../middlewares/verifyToken");
const Validator = require("../middlewares/validation");
const userSchema = require("../validation/users");
const Users = require("../controllers/users");
const authorization = require("../middlewares/authorization");

// GET ALL
router.get("/", verifyAccessToken, Users.getAll);

// GET USER STATS CREATE AT
router.get("/stats", verifyAccessToken, Users.getStats);

// GET
router.get("/find/:id", verifyAccessToken, Users.getById);

// CREATE
router.post(
  "/create",
  verifyAccessToken,
  Validator(userSchema.create),
  authorization(["admin"]),
  Users.create
);

// UPDATE
router.patch(
  "/update/:id",
  verifyAccessToken,
  Validator(userSchema.update),
  authorization(["admin"]),
  Users.updateById
);

// DELETE
router.delete(
  "/:id",
  verifyAccessToken,
  authorization(["admin"]),
  Users.deleteById
);

module.exports = router;
