const usersSwagger = {
  "/users": {
    get: {
      tags: ["Users"],
      description: "Get all users",
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
  "/users/create": {
    post: {
      tags: ["Users"],
      description: "Create user",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  description: "Name of the user",
                  type: "string",
                },
                phone: {
                  description: "Phone of the user",
                  type: "string",
                },
                email: {
                  description: "Email of the user",
                  type: "string",
                  example: "string@gmail.com",
                },
                job: {
                  description: "job of the user",
                  type: "string",
                },
                address: {
                  description: "address of the user",
                  type: "string",
                },
                profilePicture: {
                  description: "Profile picture of the user",
                  type: "string",
                },
                role: {
                  description: "address of the user",
                  type: "string",
                },
                password: {
                  description: "Password of the user",
                  type: "string",
                },
              },
              required: ["name", "email", "password", "phone"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Create user successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/users/update/{id}": {
    patch: {
      tags: ["Users"],
      description: "Update user",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Id of user",
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
                name: {
                  description: "Name of the user",
                  type: "string",
                },
                phone: {
                  description: "Phone of the user",
                  type: "string",
                },
                email: {
                  description: "Email of the user",
                  type: "string",
                  example: "string@gmail.com",
                },
                job: {
                  description: "job of the user",
                  type: "string",
                },
                address: {
                  description: "address of the user",
                  type: "string",
                },
                profilePicture: {
                  description: "Profile picture of the user",
                  type: "string",
                },
                role: {
                  description: "address of the user",
                  type: "string",
                },
                password: {
                  description: "Password of the user",
                  type: "string",
                },
              },
              required: ["name", "email", "password", "phone"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Update user successfully",
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

module.exports = usersSwagger;
