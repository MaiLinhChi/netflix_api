const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { checkDocumentExistWithFields } = require("../utils/checkParameter");

module.exports = {
  register: async (req, res) => {
    try {
      const listFields = ["email"];
      const document = await checkDocumentExistWithFields(
        User,
        null,
        listFields,
        req
      );
      if (document) return res.status(400).json("Email already existed.");
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ),
      });
      const { password, ...data } = user._doc;
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).json("Email doen't exiting!!!");

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      if (originalText !== req.body.password)
        return res.status(400).json("Wrong password!!!");

      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "4d" }
      );

      const { password, ...info } = user._doc;

      res.status(200).json({ ...info, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
