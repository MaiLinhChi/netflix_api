module.exports = {
  home: async (req, res) => {
    res
      .status(200)
      .send(
        "Wellcome to netflix api. Go to <a href='/documentation'>Documentation</a>"
      );
  },
};
