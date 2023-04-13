import prisma from '../src/config/database.js';

async function main() {
  await prisma.users.createMany({
    data: [
      {
        name: 'João',
        email: 'joao@gmail.com',
        password: '12345678',
      },
      {
        name: 'Alfredo',
        email: 'alfredo@gmail.com',
        password: '12345678',
      },
      {
        name: 'Manezin',
        email: 'manezin@gmail.com',
        password: '12345678',
      },
    ],
  });
  await prisma.books.createMany({
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
