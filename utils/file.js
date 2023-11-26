const fs = require("fs");

module.exports = {
  getFileNames: (source) =>
    fs.readdirSync(source).map((file) => {
      const name = file.replace(".js", "");
      return name.charAt(0).toUpperCase() + name.slice(1);
    }),
};
