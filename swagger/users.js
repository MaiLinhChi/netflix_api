const userSwagger = {
  "/users": {
    get: {
      tags: ["Users"],
      description: "Get all users",
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
      responses: {
        200: {
          description: "Get all users successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/users/stats": {
    get: {
      tags: ["Users"],
      description: "Get all users by create at",
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
      responses: {
        200: {
          description: "Get all users stats successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/users/find/{id}": {
    get: {
      tags: ["Users"],
      description: "Find users by id",
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
          description: "Id of the user",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Find users by id successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/users/{id}": {
    patch: {
      tags: ["Users"],
      description: "Update users by id",
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
          description: "Id to be update user",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Update user by id successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/users/{id}": {
    delete: {
      tags: ["Users"],
      description: "Delete users by id",
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
          description: "Delete user by id successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
};

module.exports = userSwagger;
