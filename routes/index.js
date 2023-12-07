const authRoute = require("../routes/auth");
const userRoute = require("../routes/user");
const movieRoute = require("../routes/movie");
const commentRoute = require("../routes/comment");
const listRoute = require("../routes/list");
const generalRoute = require("../routes/general");

const routes = (app) => {
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/comments", commentRoute);
  app.use("/movies", movieRoute);
  app.use("/lists", listRoute);
  app.use("/", generalRoute);
};

module.exports = routes;
