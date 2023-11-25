const router = require("express").Router();
// Middleware
const verifyToken = require("../middlewares/verifyToken");

const Lists = require("../controllers/lists");
const Validator = require("../middlewares/validation");
const listsSchema = require("../validation/lists");
// GET
router.get("/", Validator(listsSchema.getAll), Lists.getAll);

// CREATE
router.post(
  "/create",
  verifyToken,
  Validator(listsSchema.create),
  Lists.create
);

// UPDATE
router.patch(
  "/update/:id",
  verifyToken,
  Validator(listsSchema.update),
  Lists.update
);

// DELETE
router.delete("/:id", verifyToken, Lists.delete);

module.exports = router;
