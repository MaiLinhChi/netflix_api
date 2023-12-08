const CryptoJS = require("crypto-js");

const User = require("../models/User");
const { signAccessToken, signRtAndSaveDb } = require("../utils/signToken");
const { verifyAndDeleteRefreshToken } = require("../middlewares/verifyToken");
const { checkDocumentExistWithFields } = require("../utils/checkParameter");

module.exports = {
  register: async (req, res) => {
    try {
      const listFields = ["email"];
      await checkDocumentExistWithFields(User, null, listFields, req);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ),
      });

      const accessToken = signAccessToken(user);
      const refreshToken = await signRtAndSaveDb(user);

      const { password, ...data } = user._doc;
      res.status(201).json({ ...data, accessToken, refreshToken });
    } catch (error) {
      res.status(error.status || 500).json(error);
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
      const refreshToken = await signRtAndSaveDb(user);

      const { password, ...info } = user._doc;

      res
        .status(200)
        // .cookie("access_token", "Bearer " + accessToken, {
        //   maxAge: exAccessTokenCookies,
        //   httpOnly: true,
        //   secure: true,
        // })
        // .cookie("refresh_token", "Bearer " + refreshToken, {
        //   maxAge: exRefreshTokenCookies,
        //   httpOnly: true,
        //   secure: true,
        // })
        .json({ ...info, accessToken, refreshToken });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logout: async (req, res) => {
    try {
      // check valid token and delete
      await verifyAndDeleteRefreshToken(req);
      res.status(200).json("Logout successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const user = await verifyAndDeleteRefreshToken(req);
      const newRefreshToken = await signRtAndSaveDb(user);
      const newAccessToken = signAccessToken(user);
      return (
        res
          .status(200)
          // .cookie("access_token", "Bearer " + newAccessToken, {
          //   maxAge: exAccessTokenCookies,
          //   httpOnly: true,
          //   secure: true,
          // })
          // .cookie("refresh_token", "Bearer " + newRefreshToken, {
          //   maxAge: exRefreshTokenCookies,
          //   httpOnly: true,
          //   secure: true,
          // })
          .json({ newAccessToken, newRefreshToken })
      );
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json(error);
      }
      return res.status(500).json(error);
    }
  },
};
