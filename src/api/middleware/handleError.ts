import { Request, Response, NextFunction } from 'express';
import { ValidationError, UniqueConstraintError } from 'sequelize'; // Import UniqueConstraintError
import DomainError from '../../core/errors/DomainError';
import { logger } from '../../core/utils/logger';
import { Errors } from '../../core/constant/errors';

function handleErrors(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {

  if (req.path.startsWith('/api/v1/users')) {
    console.log('================>>>>>>>{{{}}}>>>>>>', 'NONONONOSENSE');
  };
  
  if (err instanceof DomainError) {
    return res.status(err.getHttpCode()).send({
      status: err.getStatus(),
      error: err.getName(),
      message: err.message,
      data: err.getData ? err.getData() || {} : {},
    });
  }

  if (err instanceof UniqueConstraintError) {
      logger.error('[Database Unique Constraint Error] => ', err);
      const field = err.errors && err.errors.length > 0 ? err.errors[0].path : 'unknown';
      const errorMessage = `A record with this ${field} already exists.`;
      return res.status(409).send({
          status: false,
          error: 'conflict_error',
          message: errorMessage,
          data: err.errors ? err.errors.map(e => ({ field: e.path, value: e.value, message: e.message })) : {}
      });
  }

  if (err instanceof ValidationError) {
    logger.error('[Database Validation Error] => ', err);
    return res.status(400).send({ 
      status: false,
      error: 'validation_error',
      message: 'Input validation failed.',
      data: err.errors ? err.errors.map(e => ({ field: e.path, message: e.message })) : {}
    });
  }

  logger.error('[Unhandled Server Error] => ', err);
  return res.status(500).send({
    status: false,
    error: 'server_error',
    message: Errors.SERVER_ERROR,
    data: err.message || {},
  });
}

export { handleErrors };

// Global Process Handlers (uncaughtException, unhandledRejection): These are crucial for debugging production crashes. They will log the full stack trace of any error that completely escapes your Express request/response cycle. This is the log output you've been missing from Render.