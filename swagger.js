const swaggerJsdoc = require("swagger-jsdoc");
const { getFileNames } = require("./utils/file");
const authSwagger = require("./swagger/auth");
const userSwagger = require("./swagger/users");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Netflix api",
      version: "1.0.0",
      description: "Netflix movies....",
    },
    servers: [
      {
        url: "http://localhost:9000",
        description: "Dev",
      },
      {
        url: "http://localhost:9000",
        description: "Build",
      },
    ],
    tags: getFileNames(`${__dirname}/swagger`),
    paths: {
      ...authSwagger,
      ...userSwagger,
    },
  },
  apis: ["./routes/*.route.js"],
};

module.exports = swaggerJsdoc(options);
