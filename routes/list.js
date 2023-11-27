const router = require("express").Router();
// Middleware
const verifyToken = require("../middlewares/verifyToken");

const Lists = require("../controllers/lists");
const Validator = require("../middlewares/validation");
const listsSchema = require("../validation/lists");
const authorization = require("../middlewares/authorization");

// GET
router.get("/", Validator(listsSchema.getAll), Lists.getAll);

// CREATE
router.post(
  "/create",
  verifyToken,
  Validator(listsSchema.create),
  authorization(["admin", "manager"]),
  Lists.create
);

// UPDATE
router.patch(
  "/update/:id",
  verifyToken,
  Validator(listsSchema.update),
  authorization(["admin", "manager"]),
  Lists.update
);

// DELETE
router.delete(
  "/:id",
  verifyToken,
  authorization(["admin", "manager"]),
  Lists.delete
);

module.exports = router;
