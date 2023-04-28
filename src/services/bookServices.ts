import errors from '@/errors/index';
import bookRepositories from '@/repositories/bookRepositories';

async function findAll() {
  const books = await bookRepositories.findAll();
  console.log(books);

  if (!books) throw errors.notFoundError();

  return books;
}

async function findAllMyBooks(userId: number) {
  const books = await bookRepositories.findAllMyBooks(userId);

  if (!books) throw errors.notFoundError();

  return books;
}

async function create(name: string, author: string, userId: number) {
  const book = await bookRepositories.findByName(name);

  if (book) throw errors.conflictError('Book already exists');

  await bookRepositories.create(name, author, userId);
}

async function takeBook(userId: number, bookId: number) {
  const book = await bookRepositories.findById(bookId);
  if (!book) throw errors.notFoundError();
  // if (!book.available) throw errors.conflictError('Book not available');

  await bookRepositories.updateStatusBook(false, bookId);
  await bookRepositories.takeBook(userId, bookId);
}

export default { findAll, findAllMyBooks, create, takeBook };
