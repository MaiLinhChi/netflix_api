const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

const connectDb = require("./db/db");
const routes = require("./routes");

// Use middleware
app.use(express.json());

// Connect DB
connectDb();

// Routes
routes(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
