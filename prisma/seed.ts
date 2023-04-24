import prisma from '../src/config/database';

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'João',
        email: 'joao@gmail.com',
        password: '$2b$10$5JA6GzKwOl44Lhk/sgWKpeUTgNjtx1M/xk9S6t0Xsesog6.e23Iy2',
      },
      {
        name: 'Alfredo',
        email: 'alfredo@gmail.com',
        password: '$2b$10$5JA6GzKwOl44Lhk/sgWKpeUTgNjtx1M/xk9S6t0Xsesog6.e23Iy2',
      },
      {
        name: 'Manezin',
        email: 'manezin@gmail.com',
        password: '$2b$10$5JA6GzKwOl44Lhk/sgWKpeUTgNjtx1M/xk9S6t0Xsesog6.e23Iy2',
      },
    ],
  });
  await prisma.book.createMany({
    data: [
      {
        name: 'Harry Potter',
        author: 'Jk Holling',
        userId: 1,
        available: true,
      },
      {
        name: 'Percy Jackson',
        author: 'Rick Riordan',
        userId: 2,
        available: true,
      },
      {
        name: 'It a Coisa',
        author: 'Stephen King',
        userId: 3,
        available: true,
      },
      {
        name: 'Os Segredos da Mente Milionária',
        author: 'T. Harv Eker',
        userId: 3,
        available: true,
      },
    ],
  });
}

main()
  .then(() => console.log('Seed cadastrada com sucesso!'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
