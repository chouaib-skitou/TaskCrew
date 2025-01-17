import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API',
      version: '1.0.0',
      description: `
      Welcome to the User Service API documentation. This service is part of the TaskCrew Microservices architecture. 
      It provides user management functionalities, including user creation, retrieval, updating, and deletion.

      ## Features:
      - **User Management**: Create, fetch, update, and delete user data.
      - **Secure API**: All endpoints require authentication tokens.
      - **Integration Ready**: Designed to integrate seamlessly with other microservices.

      ## Available Endpoints:
      - **/api/users**: Handle operations related to users.
      - **/api/docs**: Swagger documentation for the User Service.

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
        url: 'http://localhost:5001',
        description: 'Local development server',
      },
      {
        url: 'https://api.example.com/user-service',
        description: 'Production server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Location of your route files for API documentation
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
