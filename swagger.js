const swaggerJsdoc = require("swagger-jsdoc");
const { getFileNames } = require("./utils/file");
const authSwagger = require("./swagger/auth");
const usersSwagger = require("./swagger/users");
const moviesSwagger = require("./swagger/moves");
const listsSwagger = require("./swagger/lists");
const package = require("./package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: package.name,
      version: package.version,
      description: package.description,
    },
    servers: [
      {
        url: process.env.URL,
        description: process.env.ENVIRONMENT,
      },
    ],
    tags: getFileNames(`${__dirname}/swagger`),
    paths: {
      ...authSwagger,
      ...usersSwagger,
      ...moviesSwagger,
      ...listsSwagger,
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
