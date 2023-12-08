const router = require("express").Router();
// Middleware
const { verifyAccessToken } = require("../middlewares/verifyToken");

const Lists = require("../controllers/lists");
const Validator = require("../middlewares/validation");
const listsSchema = require("../validation/lists");
const authorization = require("../middlewares/authorization");

// GET
router.get("/", verifyAccessToken, Validator(listsSchema.getAll), Lists.getAll);

// CREATE
router.post(
  "/create",
  verifyAccessToken,
  Validator(listsSchema.create),
  authorization(["admin", "manager"]),
  Lists.create
);

// UPDATE
router.patch(
  "/update/:id",
  verifyAccessToken,
  Validator(listsSchema.update),
  authorization(["admin", "manager"]),
  Lists.update
);

// DELETE
router.delete(
  "/:id",
  verifyAccessToken,
  authorization(["admin", "manager"]),
  Lists.delete
);

module.exports = router;
