import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { Errors } from './core/constant/errors';
import { routes } from './api/Route';
import { handleErrors } from './api/middleware/handleError';
import { swaggerSpec, swaggerUi } from './core/docs/swaggerOptins';

swaggerSpec
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  morgan(
    'date[web] :method :url :status :response-time ms - :res[content-length]',
  ),
);

app.use('/book-review-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', routes());

// 404 handler
app.use((req, res, _next): void => {
  res.status(404).send({
    status: false,
    error: 'not found',
    message: Errors.RESOURCE_NOT_FOUND,
    data: {},
    path: req.url,
  });
});

app.use(handleErrors);

export default app;
