const commentsSwagger = {
  "/comments/commemt-of-movie": {
    get: {
      tags: ["Comments"],
      description: "Get all comments of movie",
      parameters: [
        {
          name: "userId",
          in: "query",
          description: "Id of user",
          schema: {
            type: "string",
          },
        },
        {
          name: "movieId",
          in: "query",
          description: "Id of movie",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Get all comments of movie successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/comments/create": {
    post: {
      tags: ["Comments"],
      description: "Create comments",
      parameters: [
        {
          name: "authorization",
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
                comment: {
                  description: "Comment of the user",
                  type: "string",
                },
                userId: {
                  description: "Id of the user",
                  type: "string",
                },
                movieId: {
                  description: "Id of the movie",
                  type: "string",
                },
              },
              required: ["title", "type", "genre", "idMovies"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Create comments successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/comments/update/{id}": {
    patch: {
      tags: ["Comments"],
      description: "Update comments",
      parameters: [
        {
          name: "authorization",
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
          description: "Id of comment",
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
                comment: {
                  description: "Comment of the user",
                  type: "string",
                },
                userId: {
                  description: "Id of the user",
                  type: "string",
                },
                movieId: {
                  description: "Id of the movie",
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Update comment successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/comments/{id}": {
    delete: {
      tags: ["Comments"],
      description: "Delete comment by id",
      parameters: [
        {
          name: "authorization",
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
          description: "Delete comment by id successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
};

module.exports = commentsSwagger;
