const router = require("express").Router();
// Model
const List = require("../models/List.model");
// Middleware
const verifyToken = require("../middlewares/verifyToken.middleware");

// GET
router.get("/", async (req, res) => {
  const typeQuery = req.query ? req.query.type : "";
  const genreQuery = req.query ? req.query.genre : "";
  let list = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE
router.post("/create", verifyToken, async (req, res) => {
  const newList = new List(req.body);

  try {
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await List.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("The list has been deleted!!!!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("YOU ARE NOT ALLOWED!!!");
  }
});

module.exports = router;
