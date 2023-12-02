const moviesSwagger = {
  "/movies": {
    get: {
      tags: ["Movies"],
      description: "Get all movies",
      responses: {
        200: {
          description: "Get all movies successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/movies/suggesteds": {
    get: {
      tags: ["Movies"],
      description: "Get suggest movies for you",
      parameters: [
        {
          name: "type",
          in: "query",
          description: "Type of movies",
          schema: {
            type: "string",
          },
          example: "movies",
        },
        {
          name: "id",
          in: "query",
          description: "Id of movies",
          schema: {
            type: "string",
          },
        },
        {
          name: "genre",
          in: "query",
          description: "Genre of movies",
          schema: {
            type: "string",
          },
          example: "Thriller",
        },
      ],
      responses: {
        200: {
          description: "Get suggested movies successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/movies/search": {
    get: {
      tags: ["Movies"],
      description: "Search for movie",
      parameters: [
        {
          name: "q",
          in: "query",
          description: "Name of movies",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Search for movie successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/movies/random": {
    get: {
      tags: ["Movies"],
      description: "Get random movies",
      parameters: [
        {
          name: "type",
          in: "query",
          description: "Type of movie",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Get random movies successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/movies/find/{id}": {
    get: {
      tags: ["Movies"],
      description: "Find movies by id",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Id of the movies",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Find movies by id successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/movies/create": {
    post: {
      tags: ["Movies"],
      description: "Create movies",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  description: "Title of the movies",
                  type: "string",
                },
                description: {
                  description: "Description of the movies",
                  type: "string",
                },
                image: {
                  description: "Image of the movies",
                  type: "string",
                },
                imageTitle: {
                  description: "Image title of the movies",
                  type: "string",
                },
                imageSmall: {
                  description: "Image small of the movies",
                  type: "string",
                },
                trailer: {
                  description: "Trailer of the movies",
                  type: "string",
                },
                video: {
                  description: "Video of the movies",
                  type: "string",
                },
                duration: {
                  description: "Duration of the movies",
                  type: "string",
                },
                limit: {
                  description: "Limit of the movies",
                  type: "number",
                },
                genre: {
                  description: "Genre of the movies",
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                starring: {
                  description: "Starring of the movies",
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                year: {
                  description: "Year of the movies",
                  type: "number",
                },
                country: {
                  description: "Country of the movies",
                  type: "string",
                },
                type: {
                  description: "Type of the movies",
                  type: "string",
                },
              },
              required: [
                "title",
                "description",
                "image",
                "imageTitle",
                "imageSmall",
                "trailer",
                "video",
                "duration",
                "limit",
                "genre",
                "starring",
                "year",
                "country",
                "type",
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Create movies successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/movies/update/{id}": {
    patch: {
      tags: ["Movies"],
      description: "Update movies",
      parameters: [
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
                  description: "Title of the movies",
                  type: "string",
                },
                description: {
                  description: "Description of the movies",
                  type: "string",
                },
                image: {
                  description: "Image of the movies",
                  type: "string",
                },
                imageTitle: {
                  description: "Image title of the movies",
                  type: "string",
                },
                imageSmall: {
                  description: "Image small of the movies",
                  type: "string",
                },
                trailer: {
                  description: "Trailer of the movies",
                  type: "string",
                },
                video: {
                  description: "Video of the movies",
                  type: "string",
                },
                duration: {
                  description: "Duration of the movies",
                  type: "string",
                },
                limit: {
                  description: "Limit of the movies",
                  type: "number",
                },
                genre: {
                  description: "Genre of the movies",
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                starring: {
                  description: "Starring of the movies",
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                year: {
                  description: "Year of the movies",
                  type: "number",
                },
                country: {
                  description: "Country of the movies",
                  type: "string",
                },
                type: {
                  description: "Type of the movies",
                  type: "string",
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
  "/movies/{id}": {
    delete: {
      tags: ["Movies"],
      description: "Delete movies by id",
      parameters: [
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

module.exports = moviesSwagger;
