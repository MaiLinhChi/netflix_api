const CryptoJS = require("crypto-js");

const User = require("../models/User");
const {
  checkDocumentExistWithFields,
  isObjectId,
} = require("../utils/checkParameter");

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await User.find({
        email: { $nin: ["mailinhchi@gmail.com"] },
      }).sort({ _id: -1 });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getStats: async (req, res) => {
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
              $month: { $toDate: "$createdAt" },
            },
            year: {
              $year: { $toDate: "$createdAt" },
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

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getById: async (req, res) => {
    try {
      isObjectId([req.params.id]);
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json("User not found");
      const { password, ...info } = user._doc;
      return res.status(200).json(info);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },

  create: async (req, res) => {
    const fieldList = ["phone", "email"];
    await checkDocumentExistWithFields(User, null, fieldList, req);
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const createdUser = await User.create(req.body);
      return res.status(200).json(createdUser);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },

  updateById: async (req, res) => {
    isObjectId([req.params.id]);
    const fieldList = ["phone", "email"];
    await checkDocumentExistWithFields(User, req.params.id, fieldList, req);

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
      return res.status(200).json(updateUser);
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },

  deleteById: async (req, res) => {
    try {
      isObjectId([req.params.id]);
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json("User id not existed.");
      return res.status(200).json("User has been deleted...");
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  },
};
