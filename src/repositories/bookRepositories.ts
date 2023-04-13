import { QueryResult } from 'pg';
import connectionDb from '../config/database.js';
import { BookEntity, FindAllBooks, findAllMyBooks } from '../protocols/types.js';

async function findAll() {
  return []; //await connectionDb.query(
  //     `
  //       SELECT
  //         b.id, b.name, b.author, b.available,
  //         u.name as "createdBy"
  //       FROM books b
  //       JOIN users u
  //       ON b."userId" = u.id;
  //   `
  //   );
}

async function findById(id: number) {
  return [];
  // await connectionDb.query(
  //   `
  //         SELECT * FROM books
  //         WHERE id = $1;
  //     `,
  //   [id]
  // );
}

async function findByName(name: string) {
  return [];
  // await connectionDb.query(
  //   `
  //       SELECT * FROM books WHERE name = $1;
  //   `,
  //   [name]
  // );
}

async function findAllMyBooks(userId: number) {
  return [];
  // await connectionDb.query(
  //   `
  //   SELECT
  //     u.name as "userName",
  //     b.name as "bookName",
  //     b.author as "bookAuthor"
  //   FROM "myBooks" m
  //     JOIN users u ON m."userId" = u.id
  //     JOIN books b ON m."bookId" = b.id
  //   WHERE m."userId" = $1
  //   `,
  //   [userId]
  // );
}

async function create(name: string, author: string, userId: number) {
  return [];
  // await connectionDb.query(
  //   `
  //       INSERT INTO books (name, author, "userId")
  //       VALUES ($1, $2, $3)
  //       `,
  //   [name, author, userId]
  // );
}

async function updateStatusBook(status: boolean, bookId: number) {
  return [];
  // await connectionDb.query(
  //   `
  //     UPDATE books
  //     SET available = $1
  //     WHERE id = $2;
  // `,
  //   [status, bookId]
  // );
}

async function takeBook(userId: number, bookId: number) {
  return [];
  // await connectionDb.query(
  //   `
  //     INSERT INTO "myBooks" ("userId", "bookId")
  //     VALUES ($1, $2);
  //   `,
  //   [userId, bookId]
  // );
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
