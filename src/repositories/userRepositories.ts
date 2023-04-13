import prisma from '../config/database.js';

async function findByEmail(email: string) {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  });
}

async function signUp(name: string, email: string, password: string) {
  await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
}

async function findById(id: number) {
  return await prisma.users.findFirst({
    where: {
      id,
    },
  });
}

export default { findByEmail, signUp, findById };
