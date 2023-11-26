const listsSwagger = {
  "/lists": {
    get: {
      tags: ["Lists"],
      description: "Get all lists",
      parameters: [
        {
          name: "type",
          in: "query",
          description: "Type of movies",
          schema: {
            type: "string",
          },
        },
        {
          name: "genre",
          in: "query",
          description: "Genre of movies parse with commas",
          schema: {
            type: "string",
          },
          example: "animation, comedy",
        },
      ],
      responses: {
        200: {
          description: "Get all lists successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/lists/create": {
    post: {
      tags: ["Lists"],
      description: "Create lists",
      parameters: [
        {
          name: "token",
          in: "header",
          description: "Token to be passed as a header",
          required: true,
          schema: {
            type: "string",
          },
          example: "Bearer ",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  description: "Title of the lists",
                  type: "string",
                },
                type: {
                  description: "Type of the lists",
                  type: "string",
                },
                genre: {
                  description: "Genre of the lists",
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                idMovies: {
                  description: "List id of the movies",
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["title", "type", "genre", "idMovies"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Create lists successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/lists/update/{id}": {
    patch: {
      tags: ["Lists"],
      description: "Update lists",
      parameters: [
        {
          name: "token",
          in: "header",
          description: "Token to be passed as a header",
          required: true,
          schema: {
            type: "string",
          },
          example: "Bearer ",
        },
        {
          name: "id",
          in: "path",
          description: "Id of movie",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  description: "Title of the lists",
                  type: "string",
                },
                type: {
                  description: "Type of the lists",
                  type: "string",
                },
                genre: {
                  description: "Genre of the lists",
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                idMovies: {
                  description: "List id of the movies",
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Update movies successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/lists/{id}": {
    delete: {
      tags: ["Lists"],
      description: "Delete movies by id",
      parameters: [
        {
          name: "token",
          in: "header",
          description: "Token to be passed as a header",
          required: true,
          schema: {
            type: "string",
          },
          example: "Bearer ",
        },
        {
          name: "id",
          in: "path",
          description: "Id to be delete",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Delete movies by id successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
};

module.exports = listsSwagger;
