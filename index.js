const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

const connectDb = require("./db/db");
const routes = require("./routes");
const swaggerDocument = require("./swagger");
const configs = require("./configs");
// Use middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDb();

// Routes
routes(app);

// Swagger
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
