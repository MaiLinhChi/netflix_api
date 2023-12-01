const CryptoJS = require("crypto-js");

const User = require("../models/User");
const { signAccessToken, signRtAndSaveRedis } = require("../utils/signToken");
const { verifyRefreshToken } = require("../middlewares/verifyToken");
const { checkDocumentExistWithFields } = require("../utils/checkParameter");
const { exAccessTokenRedis, exRefreshTokenRedis } = require("../configs");

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

      const accessToken = signAccessToken(user);
      const refreshToken = await signRtAndSaveRedis(user);

      const { password, ...info } = user._doc;

      res
        .status(200)
        .cookie("access_token", "Bearer " + accessToken, {
          maxAge: exAccessTokenRedis,
          httpOnly: true,
        })
        .cookie("refresh_token", "Bearer " + refreshToken, {
          maxAge: exRefreshTokenRedis,
          httpOnly: true,
        })
        .json({ ...info, accessToken, refreshToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  refreshToken: async (req, res) => {
    const user = await verifyRefreshToken(req, res);
    const newAccessToken = signAccessToken(user);
    const newRefreshToken = await signRtAndSaveRedis(user);

    return res
      .status(200)
      .cookie("access_token", "Bearer " + newAccessToken, {
        maxAge: exAccessTokenRedis,
        httpOnly: true,
      })
      .cookie("refresh_token", "Bearer " + newRefreshToken, {
        maxAge: exRefreshTokenRedis,
        httpOnly: true,
      })
      .json({ newAccessToken, newRefreshToken });
  },
};
