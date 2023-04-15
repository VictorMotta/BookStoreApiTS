import { Request, Response, NextFunction } from 'express';
import errors from '../errors/index.js';
import userRepositories from '../repositories/userRepositories.js';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

export default async function authValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) throw errors.unauthorizedError();

  const parts = authorization.split(' ');
  if (parts.length !== 2) throw errors.unauthorizedError();

  const [schema, token] = parts;

  if (schema !== 'Bearer') throw errors.unauthorizedError();

  try {
    const { userId } = jwt.verify(token, process.env.SECRET_JWT) as JWTPayload;

    console.log('chegou aqui!');

    if (!userId) throw errors.unauthorizedError();

    const user = await userRepositories.findById(userId);

    if (!user) throw errors.unauthorizedError();

    res.locals.user = user;

    next();
  } catch (err) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

type JWTPayload = {
  userId: number;
};
