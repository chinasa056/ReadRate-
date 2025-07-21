import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Review API Documentation',
      version: '1.0.0',
      description:
        'Documentation for Book Review API- Manage books, users, and reviews',
      license: {
        name: 'BASE_URL:https://readrate-api.onrender.com',
      },
      contact: {
        name: 'BookReview Dev Team',
        url: 'https://github.com/chinasa056/ReadRate-',
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [] }],
    servers: [
      {
        url: 'https://readrate-api.onrender.com',
        description: 'Production Server',
      },
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/api/Route/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
