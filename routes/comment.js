const router = require("express").Router();
// Middleware
const { verifyAccessToken } = require("../middlewares/verifyToken");

const Comments = require("../controllers/comments");
const Validator = require("../middlewares/validation");
const commentsSchema = require("../validation/comments");
const authorization = require("../middlewares/authorization");

// GET
router.get(
  "/comment-of-movie",
  Validator(commentsSchema.getCommemtOfMovie),
  Comments.getCommentOfMovie
);

// CREATE
router.post(
  "/create",
  verifyAccessToken,
  Validator(commentsSchema.create),
  authorization(["admin", "manager"]),
  Comments.create
);

// UPDATE
router.patch(
  "/update/:id",
  verifyAccessToken,
  Validator(commentsSchema.update),
  authorization(["admin", "manager"]),
  Comments.update
);

// DELETE
router.delete(
  "/:id",
  verifyAccessToken,
  authorization(["admin", "manager"]),
  Comments.delete
);

module.exports = router;
