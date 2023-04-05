import { Request, Response, NextFunction } from 'express';
import bookServices from '../services/bookServices.js';
import { createNewBook } from '../protocols/types.js';

async function findAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const books = await bookServices.findAll();

    return res.send({ books });
  } catch (err) {
    next(err);
  }
}

async function findAllMyBooks(_req: Request, res: Response, next: NextFunction) {
  const id = res.locals.user.id as number;

  try {
    const books = await bookServices.findAllMyBooks(id);
    return res.send({ books });
  } catch (err) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  const { name, author } = req.body as createNewBook;

  const id = res.locals.user.id as number;
  try {
    await bookServices.create(name, author, id);

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

async function takeBook(req: Request, res: Response, next: NextFunction) {
  const id = res.locals.user.id as number;
  const bookId = +req.params.id as number;

  try {
    await bookServices.takeBook(id, bookId);
    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

export default {
  findAll,
  findAllMyBooks,
  create,
  takeBook,
};
