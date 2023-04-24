import prisma from '../src/config/database';

export async function cleanDb() {
  await prisma.myBook.deleteMany({});
  await prisma.book.deleteMany({});
  await prisma.user.deleteMany({});
}
