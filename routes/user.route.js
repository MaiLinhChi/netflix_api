const router = require("express").Router();
const CryptoJS = require("crypto-js");

const User = require("../models/User.model");

// Middleware
const verifyToken = require("../middlewares/verifyToken.middleware");
var ObjectID = require("mongodb").ObjectID;

// GET ALL
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET USER STATS CREATE AT
router.get("/stats", verifyToken, async (req, res) => {
  const date = new Date();
  const yearNow = date.getFullYear();

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const newUser = await User.aggregate([
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
          year: {
            $year: "$createdAt",
          },
        },
      },
      {
        $match: {
          year: yearNow,
        },
      },
      {
        $group: {
          _id: "$month",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]).limit(5);

    const data = newUser.map((item) => ({
      month: MONTHS[item._id - 1],
      count: item.count,
    }));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id))
      return res.status(401).json("Id is not valid");
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE
router.post("/create", verifyToken, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }

  try {
    const createdUser = await User.create(req.body);
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.patch("/:id", verifyToken, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
