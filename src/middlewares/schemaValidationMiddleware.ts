import err from '@/errors/index';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function validateSchema(schema: ObjectSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw err.conflictError(errors);
    }

    next();
  };
}
