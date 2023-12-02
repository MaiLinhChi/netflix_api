const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

const connectDb = require("./db/db");
const routes = require("./routes");
const swaggerDocument = require("./swagger");
// require("./utils/connect_redis");

// Use middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect DB
connectDb();

// Routes
routes(app);

// Swagger
var options = {
  customSiteTitle: "Netflix api",
};
app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
