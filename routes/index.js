const authRoute = require("../routes/auth.route");
const userRoute = require("../routes/user.route");
const movieRoute = require("../routes/movie.route");
const listRoute = require("../routes/list.route");

const routes = (app) => {
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/movies", movieRoute);
    app.use("/api/lists", listRoute);
};

module.exports = routes;