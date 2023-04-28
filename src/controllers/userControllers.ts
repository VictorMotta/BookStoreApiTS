import { NextFunction, Request, Response } from 'express';
import { User } from '@/protocols/types';
import userServices from '@/services/userServices';

async function signUp(req: Request, res: Response, next: NextFunction) {
  const newUser = req.body as User;
  try {
    await userServices.signUp(newUser);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as User;
  try {
    const token = await userServices.signIn({ email, password });
    return res.send({ token });
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  signIn,
};
