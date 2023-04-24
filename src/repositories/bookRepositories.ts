import { BookAndCreator, TakenBook, findAllMyBooks } from '../protocols/types';
import prisma from '../config/database';

async function findAll(): Promise<BookAndCreator[]> {
  return await prisma.book.findMany({
    select: {
      id: true,
      name: true,
      author: true,
      available: true,
      User: { select: { name: true } },
    },
  });
}

async function findById(id: number) {
  return await prisma.book.findFirst({ where: { id } });
}

async function findByName(name: string) {
  return await prisma.book.findFirst({ where: { name } });
}

async function findAllMyBooks(userId: number): Promise<TakenBook[]> {
  return prisma.myBook.findMany({
    select: {
      id: true,
      User: { select: { name: true } },
      Book: { select: { name: true, author: true } },
    },
    where: { userId },
  });
}

async function create(name: string, author: string, userId: number) {
  await prisma.book.create({
    data: {
      name,
      author,
      userId,
      available: true,
    },
  });
}

async function updateStatusBook(status: boolean, bookId: number) {
  return await prisma.book.update({ where: { id: bookId }, data: { available: status } });
}

async function takeBook(userId: number, bookId: number) {
  await prisma.myBook.create({ data: { userId, bookId } });
}

export default {
  findAll,
  findById,
  findByName,
  findAllMyBooks,
  create,
  updateStatusBook,
  takeBook,
};
