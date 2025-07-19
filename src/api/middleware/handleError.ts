import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';
import DomainError from '../../core/errors/DomainError';
import { logger } from '../../core/utils/logger';
import { Errors } from '../../core/constant/errors';

function handleErrors(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {

  if (req.path.startsWith('/api/users')) {
    console.log('================>>>>>>>{{{}}}>>>>>>', 'NONONONOSENSE');
    
  }
  
  if (err instanceof DomainError) {
    return res.status(err.getHttpCode()).send({
      status: err.getStatus(),
      error: err.getName(),
      message: err.message,
      data: err.getData ? err.getData() || {} : {},
    });
  }

  if (err instanceof ValidationError) {
    logger.error('[Database Validation Error] => ', err);
  }

  logger.error('[Unhandled Error] => ', err);
  return res.status(500).send({
    status: false,
    error: 'server_error',
    message: Errors.SERVER_ERROR,
    data: {},
  });
}

export { handleErrors };
