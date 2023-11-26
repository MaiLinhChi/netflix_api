const authSwagger = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      description: "Creating accounts for access",
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
                password: {
                  description: "Password of the user",
                  type: "string",
                },
              },
              required: ["name", "email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Creating accounts successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      description:
        "Verifying identity for personalized interactions and services",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  description: "Email of the user",
                  type: "string",
                  example: "string@gmail.com",
                },
                password: {
                  description: "Password of the user",
                  type: "string",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successfully",
          content: {
            "application/json": {},
          },
        },
      },
    },
  },
};

module.exports = authSwagger;
