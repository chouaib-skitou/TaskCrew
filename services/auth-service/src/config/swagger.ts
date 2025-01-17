import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: `
      Welcome to the Auth Service API documentation. This service is part of the TaskCrew Microservices architecture.
      It provides user authentication and authorization functionalities, including token management and user session handling.

      ## Features:
      - **Authentication**: Securely authenticate users with email and password.
      - **Token Management**: Generate, refresh, and revoke access and refresh tokens.
      - **Secure API**: Endpoints for secure and scalable authentication workflows.
      - **Integration Ready**: Designed to integrate seamlessly with other microservices in the TaskCrew architecture.

      ## Available Endpoints:
      - **/api/auth/register**: Register a new user.
      - **/api/auth/login**: Authenticate a user and issue tokens.
      - **/api/auth/refresh-token**: Refresh the access token using a refresh token.
      - **/api/auth/logout**: Revoke a user's refresh token.
      - **/api/docs**: Swagger documentation for the Auth Service.

      ## Contact
      For questions or support, contact:
      - **Developer**: Chouaib Skitou
      - **Email**: chouaib.skitou@example.com
      `,
      contact: {
        name: 'Chouaib Skitou',
        email: 'chouaib.skitou@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local development server',
      },
      {
        url: 'https://api.example.com/auth-service',
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Location of your route files for API documentation
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: express.Application): void => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
